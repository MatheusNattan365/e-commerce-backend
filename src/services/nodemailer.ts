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
