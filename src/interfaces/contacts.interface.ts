import { z } from "zod";
import {
  AllContactsSchemaResponse,
  contactsSchema,
  contactsSchemaRequest,
} from "../schemas/contacts.schema";
import { DeepPartial } from "typeorm";

export type TContacts = z.infer<typeof contactsSchema>;
export type TContactsRequest = z.infer<typeof contactsSchemaRequest>;
export type TContactsRequestUpdate = DeepPartial<TContactsRequest>;
export type TAllContactsResponse = z.infer<typeof AllContactsSchemaResponse>;
