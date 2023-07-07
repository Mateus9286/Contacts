import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { Contact } from "../entities";

export const ensureContactUserAlreadyAddedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const contactsRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const existingContact: Contact | null = await contactsRepository
    .createQueryBuilder("contacts")
    .where("contacts.email = :email", { email: req.body.email })
    .andWhere("contacts.customer = :userId", { userId: res.locals.customerId })
    .getOne();

  if (existingContact) {
    throw new AppError("A contact with this email has already been added", 409);
  }

  return next();
};
