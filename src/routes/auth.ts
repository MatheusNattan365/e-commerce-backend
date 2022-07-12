/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as userService from "@services/users";
import * as authService from "@services/auth";
import { BaseUser, User, Users } from "types/User";
import { checkJwt } from "../middleware/checkjwt";
import { verifyToken } from "@services/jwt";
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
    checkJwt,
    async (req: Request, res: Response) => {
        const user = res.locals.user;

        if (!user) throw new Error("Something wrong with token");

        const confirmedEmailUser = userService.confirmUserEmail(user.email);

        res.redirect("http://localhost:7000/login");
    }
);

// POST    - Sign-in
authRouter.post("/sign-in", async (req: Request, res: Response) => {
    try {
        const login: { email: string; password: string } = req.body;

        const jwt = await authService.signIn(login);

        res.status(201).json(jwt);
    } catch (e) {
        res.status(500).send((e as any).message);
    }
});

// POST    - Sign-up
authRouter.post("/sign-up", async (req: Request, res: Response) => {
    try {
        const user: BaseUser = req.body;

        const newUser = await authService.signUp(user);

        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).send((e as any).message);
    }
});
