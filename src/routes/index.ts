import express from "express";
import { authRouter } from "./auth";
import { usersRouter } from "./users";

const routes = express.Router();

routes.use("/auth", authRouter);
routes.use("/users", usersRouter);

export { routes };
