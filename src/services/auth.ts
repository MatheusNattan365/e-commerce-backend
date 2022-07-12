import User from "@models/User";
import * as userService from "@services/users";
import { BaseUser, User as IUser } from "types/User";
import { hashPassword, comparePassword } from "./bcrypt";

export async function signUp(body: BaseUser): Promise<User> {
    if (!body.email || !body.password) {
        throw new Error("Required fields are missing!");
    }

    body.password = await hashPassword(body.password).then((res) => res);

    return await User.create(body);
}

export async function signIn(login: {
    email: string;
    password: string;
}): Promise<BaseUser> {
    if (!login.email || !login.password) {
        throw new Error("Required fields are missing!");
    }

    // 1 - layer of authentication!
    const user = await userService
        .getUserByEmail(login.email)
        .then((res) => res?.toJSON());

    if (!user) throw new Error("User not found!");

    // 2 - layer of authentication!
    const passwordMatch = await comparePassword(login.password, user.password);

    if (!passwordMatch) throw new Error("Password do not match");

    // 3 - layer of autherntication
    if (!user.confirmedEmail) throw new Error("You need to confirm your email");

    return user;
}
