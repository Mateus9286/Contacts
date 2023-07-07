import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { loginSchema } from "../schemas/login.schemas";
import { loginController } from "../controllers/login.controller";

export const loginRoutes: Router = Router();

loginRoutes.post("", ensureDataIsValidMiddleware(loginSchema), loginController);
