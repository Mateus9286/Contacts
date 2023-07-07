import { Request, Response } from "express";
import {
  createContactService,
  deleteContactService,
  getContactByIdService,
  updateContactService,
  getAllContactsService,
} from "../services/Contact";

export const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactData = req.body;

  const contact = await createContactService(contactData);
  return res.status(201).json({ contact });
};

export const getAllContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contact = await getAllContactsService();
  return res.json({ contact });
};

export const getContactByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const contact = await getContactByIdService(Number(id));
  return res.json({ contact });
};

export const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const contact = await updateContactService(Number(id), req.body);
  return res.json({ contact });
};

export const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const contact = await deleteContactService(Number(id));
  return res.json({ contact });
};
