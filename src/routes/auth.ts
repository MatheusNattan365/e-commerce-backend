/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as userService from "@services/users";
import { User, Users } from "types/User";

/**
 * Router Definition
 */

export const authRouter = express.Router();

/**
 * Controller Definitions
 */

// GET     - Confirm email
authRouter.get(
    "/confirm-email/:jwt",
    async (req: Request, res: Response) => {}
);

// POST    - Sign-in
authRouter.post("/sign-in", async (req: Request, res: Response) => {});

// POST    - Sign-up
authRouter.post("/sign-up", async (req: Request, res: Response) => {});
