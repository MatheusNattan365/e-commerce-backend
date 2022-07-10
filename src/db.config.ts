import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_USER && !process.env.DB_PASSWORD) {
    process.exit(1);
}

// Option 1: Passing a connection URI
const sequelize = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`
); // Example for postgres

export { sequelize };
