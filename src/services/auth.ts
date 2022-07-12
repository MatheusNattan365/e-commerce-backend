import User from "@models/User";
import * as userService from "@services/users";
import { buildToken } from "./jwt";
import { BaseUser, User as IUser } from "types/User";
import { hashPassword, comparePassword } from "./bcrypt";
import { transport } from "./nodemailer";

export async function signUp(body: BaseUser): Promise<User> {
    if (!body.email || !body.password) {
        throw new Error("Required fields are missing!");
    }

    body.password = await hashPassword(body.password).then((res) => res);

    const user = await User.create(body);

    const jwt = buildToken(user.toJSON());

    transport.sendMail(
        {
            from: "devx@devx.com",
            to: body.email,
            subject: "Confirm your email!",
            html: `<a href="http://localhost:7000/api/v1/auth/confirm-email/${jwt}">Confirm Email</a>`,
        },
        (err, info) => {
            if (err) throw new Error("Email not sended!");

            console.log("Email sended!", info);
        }
    );

    return user;
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
