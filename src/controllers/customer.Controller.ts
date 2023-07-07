import {
  createCustomerService,
  deleteCustomerService,
  updateCustomerService,
} from "../services/Customer/customer.service";
import { Customer } from "../entities";
import { Request, Response } from "express";

export const createCustomerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const CustomerData = req.body;

  const Customer = await createCustomerService(
    CustomerData as Partial<Customer>
  );
  return res.status(201).json({ Customer });
};

export const updateCustomerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = res.locals.customerId;
  const customer = await updateCustomerService(Number(id), req.body);
  return res.json({ customer });
};

export const deleteCustomerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = res.locals.customerId;
  const customer = await deleteCustomerService(Number(id));
  return res.json({ customer });
};
