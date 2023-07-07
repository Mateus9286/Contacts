import { Router } from "express";
import {
  createCustomerController,
  deleteCustomerController,
  updateCustomerController,
} from "../controllers/customer.Controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  customerSchemaRequest,
  customerSchemaUpdate,
} from "../schemas/customer.schemas";
import { ensureEmailIsUniqueMiddleware } from "../middlewares/ensureEmailIsUnique.middleware";
import { ensureIsAuthMiddleware } from "../middlewares/ensureIsAuth.middleware";

const customerRoutes: Router = Router();

customerRoutes.post(
  "",
  ensureDataIsValidMiddleware(customerSchemaRequest),
  ensureEmailIsUniqueMiddleware,
  createCustomerController
);
customerRoutes.patch(
  "/:id",
  ensureIsAuthMiddleware,
  ensureDataIsValidMiddleware(customerSchemaUpdate),
  updateCustomerController
);
customerRoutes.delete("/:id", ensureIsAuthMiddleware, deleteCustomerController);

export default customerRoutes;
