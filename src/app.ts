import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";
import "reflect-metadata";
import "dotenv/config";
import contactRoutes from "./routers/contact.routes";
import customerRoutes from "./routers/customer.routes";
import { loginRoutes } from "./routers/login.routes";

const app: Application = express();

app.use(express.json());

app.use("/contact", contactRoutes);
app.use("/login", loginRoutes);
app.use("/customer", customerRoutes);

app.use(handleErrors);

export default app;
