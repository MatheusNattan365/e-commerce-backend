import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "@models/User";
import { BaseUser } from "types/User";

dotenv.config();

const jwtConfig = {
    secret: process.env.JWT_SECRET || "",
};

export function buildToken(user: User | BaseUser): string {
    return jwt.sign(user, jwtConfig.secret, { expiresIn: "1h" });
}

export function verifyToken(token: string): any {
    return jwt.verify(token, jwtConfig.secret);
}
