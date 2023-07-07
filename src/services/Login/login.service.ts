import { Repository } from "typeorm";
import "dotenv/config";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { iLogin } from "../../interfaces/login.interface";
import { Customer } from "../../entities";

export const loginService = async (data: iLogin): Promise<string> => {
  const customerRepository: Repository<Customer> =
    AppDataSource.getRepository(Customer);
  const customer: Customer | null = await customerRepository.findOne({
    where: {
      email: data.email,
    },
  });

  if (!customer) {
    throw new AppError("Invalid email or password", 403);
  }

  const password: boolean = await compare(data.password, customer.password);
  if (!password) {
    throw new AppError("Invalid email or password", 403);
  }

  const token: string = jwt.sign(
    {
      email: customer.email,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(customer.id),
    }
  );

  return token;
};
