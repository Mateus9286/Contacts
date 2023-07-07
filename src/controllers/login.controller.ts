import { Request, Response } from "express";
import { iLogin } from "../interfaces/login.interface";
import { loginService } from "../services/Login/login.service";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: iLogin = req.body;
  const token: string = await loginService(data);
  return res.status(200).json({
    token: token,
  });
};
