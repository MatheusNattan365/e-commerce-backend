import User from "@models/User";
import { User as IUser } from "types/User";

export async function createNewUser(body: IUser): Promise<User> {
    if (!body.email) {
        throw new Error("Email is missing!");
    }

    return await User.create(body);
}

export async function getAllUsers(): Promise<User[]> {
    return User.findAll();
}
