import { z } from "zod";

export const customerSchema = z.object({
  id: z.number(),
  fullName: z.string().max(80),
  email: z.string().max(45).email(),
  password: z.string().max(25),
  phone: z.string().max(11),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const customerSchemaRequest = customerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const customerSchemaResponse = customerSchema.omit({
  password: true,
});

export const customerSchemaUpdate = customerSchemaRequest.deepPartial();
