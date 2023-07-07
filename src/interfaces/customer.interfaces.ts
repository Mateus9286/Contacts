import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  customerSchema,
  customerSchemaRequest,
  customerSchemaResponse,
} from "../schemas/customer.schemas";

export type iCustomer = z.infer<typeof customerSchema>;
export type iCustomerRequest = z.infer<typeof customerSchemaRequest>;
export type iCustomerResponse = z.infer<typeof customerSchemaResponse>;
export type iCustomerRequestUpdate = DeepPartial<iCustomerRequest>;
