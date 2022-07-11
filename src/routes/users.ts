/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as userService from "@services/users";
import { User, Users } from "types/User";

/**
 * Router Definition
 */

const usersRouter = express.Router();

/**
 * Controller Definitions
 */

// POST     -  createUser
usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const user: User = req.body;

        const newUser = await userService.createNewUser(user);

        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).send((e as any).message);
    }
});

// GET      - allUsers (DEV)
usersRouter.get("/", async (req: Request, res: Response) => {
    try {
        const allusers = await userService.getAllUsers();

        res.status(201).json(allusers);
    } catch (e) {
        res.status(500).send((e as any).message);
    }
});

export { usersRouter };

// POST items

// PUT items/:id

// DELETE items/:id
