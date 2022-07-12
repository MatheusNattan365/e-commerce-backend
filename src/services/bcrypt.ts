import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const bcryptConfig = {
    salts: parseInt(process.env.BCRYPT_SALT_ROUNDS!, 10) || 10,
};

export async function hashPassword(password: string): Promise<string> {
    let hashedPassword = "";

    await bcrypt
        .hash(password, bcryptConfig.salts)
        .then((res) => (hashedPassword = res));

    return hashedPassword;
}

export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    let passwordMatch = false;

    await bcrypt
        .compare(password, hashedPassword)
        .then((res) => (passwordMatch = res));

    return passwordMatch;
}
