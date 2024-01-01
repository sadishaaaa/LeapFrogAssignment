import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../Model/Model";
import { sendVerificationEmail } from "../utils/email";

const secretKey = "todolist";
export const createUser = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const result = await pool.query(
      "INSERT INTO users (username, phonenumber, address, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [data.username, data.phonenumber, data.address, data.email, data.password]
    );
    // verufy mail token
    const infoObj = {
      id: result.rows[0].userid,
    };

    const expiryInfo = {
      expiresIn: "2d",
    };

    const verificationToken = await jwt.sign(infoObj, secretKey, expiryInfo);
// sending token and email to emailutils
    await sendVerificationEmail(data.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "Successfully added. Verification email sent.",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const bearerToken = req.headers.authorization;
    console.log(bearerToken)
    if (!bearerToken) {
      throw new Error("Bearer token not provided");
    }
    //removing bearer from bearer token, selecting 1 index to get the token
    const token = bearerToken.split(" ")[1];
    console.log(token);

    // Verify token
    const infoObj: any = await jwt.verify(token, secretKey);
    console.log(infoObj)

    const userId: string = infoObj.id;

    // Update user and await the result
    const result = await pool.query(
      "UPDATE users SET emailVerified = $1 WHERE userid = $2 RETURNING *",
      ["true", userId]
    );

    res.json({
      success: true,
      message: "Email verified",
      data: result.rows[0], // Include the updated user information in the response if needed
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;
//checking email on dtabase
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log(user);

      if (user.emailverified) {
        const isPasswordValidated = await bcrypt.compare(
          password,
          user.password
        );

        if (isPasswordValidated) {
            //generating token for login
          const infoObj = {
            id: user.userid,
          };

          const expiryInfo = {
            expiresIn: "365d",
          };

          const verificationToken = await jwt.sign(
            infoObj,
            secretKey,
            expiryInfo
          );

          res.json({
            success: true,
            message: "Login successful",
            data: user,
            token: verificationToken,
          });
        } else {
          throw new Error("Password is wrong");
        }
      } else {
        throw new Error("Email is not verified");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};