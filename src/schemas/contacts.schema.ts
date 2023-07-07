import { z } from "zod";
import { customerSchemaResponse } from "./customer.schemas";

export const contactsSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string().max(40).email(),
  phone: z.string().max(11),
  registrationDate: z.string(),
  customer: customerSchemaResponse,
});

export const contactsSchemaRequest = contactsSchema.omit({
  id: true,
  registrationDate: true,
  customer: true,
});

export const contactsSchemaRequestUpdate = contactsSchemaRequest.deepPartial();
export const AllContactsSchemaResponse = contactsSchema
  .omit({ customer: true })
  .array();
