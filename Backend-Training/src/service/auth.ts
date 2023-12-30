import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ISignUp } from "../interface/auth";
// import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constant.jwt";
const SALT_ROUNDS = 10;
export const signup = async (body: ISignUp) => {
  await bcrypt.hash(body.password, SALT_ROUNDS, function (err, hash) {
    console.log({ hash });
  });
  return;
};
// export const login = async (body:ISignUp) => {
// const user = users.find(({email}) => email === body.email)!;
// const passwordMatch = await bcrypt.compare(body.password,user.password);
// if(!passwordMatch){
//     throw new Error("Unauthorized");
    
// }
// const accessToken = jwt.sign(user, config.jwt.accessTokenSecret!,{
//     expiresIn:.ACCESS_TOKEN_EXPIRY,
// })
// }
