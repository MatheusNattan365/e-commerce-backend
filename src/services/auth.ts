import User from "@models/User";
import * as userService from "@services/users";
import { buildToken } from "./jwt";
import { BaseUser, User as IUser } from "types/User";
import { hashPassword, comparePassword } from "./bcrypt";
import { sendConfirmationEmail, transport } from "./nodemailer";

export async function signUp(body: BaseUser): Promise<User | string> {
    if (!body.email || !body.password) {
        return "Required fields are missing!";
    }

    const userAlreadyExist = await userService.getUserByEmail(body.email);

    if (userAlreadyExist) return "The email is in use!";

    body.password = await hashPassword(body.password);

    const user = await User.create(body);

    const jwt = buildToken(user.toJSON());

    sendConfirmationEmail(body.email, jwt);

    return user;
}

export async function signIn(login: {
    email: string;
    password: string;
}): Promise<BaseUser | string> {
    if (!login.email || !login.password) {
        throw new Error("Required fields are missing!");
    }

    // 1 - layer of authentication!
    const user = await userService
        .getUserByEmail(login.email)
        .then((res) => res?.toJSON());

    if (!user) return "User not found!";

    // 2 - layer of authentication!
    const passwordMatch = await comparePassword(login.password, user.password);

    if (!passwordMatch) return "Password do not match";

    // 3 - layer of autherntication
    if (!user.confirmedEmail) {
        const jwt = buildToken(user);
        sendConfirmationEmail(user.email, jwt);
        return "You need to confirm your email";
    }

    return user;
}
