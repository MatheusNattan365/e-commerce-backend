import express from "express";
import { authRouter } from "./auth";
import usersRouter from "./users";
import productsRouter from "./products";

const routes = express.Router();

routes.use("/auth", authRouter);
routes.use("/users", usersRouter);
routes.use("/products", productsRouter);

export default routes;
