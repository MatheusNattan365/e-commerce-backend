import dotenv from "dotenv";
import { Options } from "sequelize/types";

dotenv.config();

const dbConfig: Options = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT!, 10),
    host: "localhost",
    dialect: "postgres",
};

export default dbConfig;
