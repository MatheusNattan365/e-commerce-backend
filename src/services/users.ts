import User from "@models/User";
import { BaseUser, User as IUser } from "types/User";
import { hashPassword } from "./bcrypt";

export async function createNewUser(body: BaseUser): Promise<User> {
    if (!body.email || !body.password) {
        throw new Error("Required fields are missing!");
    }

    body.password = await hashPassword(body.password).then((res) => res);

    return await User.create(body);
}

export async function getAllUsers(): Promise<User[]> {
    return await User.findAll();
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return await User.findOne({
        where: {
            email,
        },
    });
}
