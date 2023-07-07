import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

export const ensureIsAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token: string | undefined = req.headers.authorization;
  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  const splitToken = token.split(" ")[1];

  jwt.verify(splitToken, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    res.locals.customerId = decoded.sub;

    return next();
  });
};
