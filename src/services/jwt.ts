import * as jwt from "jsonwebtoken";
import { User } from "types/User";
import dotenv from "dotenv";

dotenv.config();

const jwtConfig = {
    secret: process.env.JWT_SECRET || "",
};

export function buildToken(user: User): string {
    return jwt.sign(user, jwtConfig.secret, { expiresIn: "1h" });
}

export function verifyToken(token: string): any {
    return jwt.verify(token, jwtConfig.secret);
}
