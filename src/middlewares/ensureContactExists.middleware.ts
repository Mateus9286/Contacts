import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { validate as validateUUID } from "uuid";
import { Contact } from "../entities";

export const ensureContactExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contactId = String(req.params.id);
  if (!validateUUID(contactId)) {
    throw new AppError("Invalid contact id", 400);
  }

  const contact: Contact | null = await contactRepository.findOne({
    where: { id: Number(contactId) },
  });
  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  return next();
};
