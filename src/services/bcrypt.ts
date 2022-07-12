import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const bcryptConfig = {
    salts: parseInt(process.env.BCRYPT_SALT_ROUNDS!, 10) || 10,
};

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, bcryptConfig.salts);
}

export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
