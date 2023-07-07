import { Router } from "express";
import { ensureIsAuthMiddleware } from "../middlewares/ensureIsAuth.middleware";
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from "../controllers/contact.Controller";
import { ensureContactExistsMiddleware } from "../middlewares/ensureContactExists.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  contactsSchemaRequest,
  contactsSchemaRequestUpdate,
} from "../schemas/contacts.schema";
import { ensureContactUserAlreadyAddedMiddleware } from "../middlewares/ensureContactUserAlreadyAdded.middleware";

const contactRoutes: Router = Router();

contactRoutes.use(ensureIsAuthMiddleware);

contactRoutes.get("", getAllContactsController);

contactRoutes.get(
  "/:id",
  ensureContactExistsMiddleware,
  getContactByIdController
);

contactRoutes.post(
  "",
  ensureDataIsValidMiddleware(contactsSchemaRequest),
  ensureContactUserAlreadyAddedMiddleware,
  createContactController
);

contactRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(contactsSchemaRequestUpdate),
  ensureContactExistsMiddleware,
  updateContactController
);

contactRoutes.delete(
  "/:id",
  ensureContactExistsMiddleware,
  deleteContactController
);

export default contactRoutes;
