import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { Customer } from "../entities";

export const ensureEmailIsUniqueMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const customerRepository: Repository<Customer> =
    AppDataSource.getRepository(Customer);
  const emailRequest: string = req.body.email;
  const emailUser: Customer | null = await customerRepository.findOneBy({
    email: emailRequest,
  });

  if (emailUser) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};
