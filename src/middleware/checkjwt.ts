import express, { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/jwt";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.jwt) throw new Error("No Token sended!");

        const user = verifyToken(req.params.jwt);

        if (!user.email) throw new Error("Invalid Token");

        console.log("Decoded JWT:", user);

        res.locals.user = user;

        next();
    } catch (error) {
        throw new Error("Something wrong with jwt check");
    }
};
