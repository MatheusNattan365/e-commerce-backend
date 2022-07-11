import User from "@models/User";
import { BaseUser, User as IUser } from "types/User";

export async function createNewUser(body: BaseUser): Promise<User> {
    if (!body.email || !body.password) {
        throw new Error("Required fields are missing!");
    }

    return await User.create(body);
}

export async function getAllUsers(): Promise<User[]> {
    return User.findAll();
}
