import * as nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Put your MailTrap configuration right here!
export const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: parseInt(process.env.MAILTRAP_PORT!, 10),
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
    },
});

export function sendConfirmationEmail(userEmail: string, jwt: string): void {
    return transport.sendMail(
        {
            from: "devx@devx.com",
            to: userEmail,
            subject: "Confirm your email!",
            html: `<a href="http://localhost:7000/api/v1/auth/confirm-email/${jwt}">Confirm Email</a>`,
        },
        (err, info) => {
            if (err) throw new Error("Email not sended!");

            console.log("Email sended!", info);
        }
    );
}
