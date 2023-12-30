import { Request, Response } from "express";
// import * as userService from "../service/user";
export const getUsers = (req: Request, res: Response) => {
  const params = req.query;

  return res.json({
    data: params,
  });
};
export const getUserById = (req: Request, res: Response) => {
  const id = +req.params.id;
  return res.json({
    message: `user id : ${id}`,
  });
};
