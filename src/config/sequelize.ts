import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import dbConfig from "./db.config";

dotenv.config();

if (!process.env.DB_USER && !process.env.DB_PASSWORD) {
    process.exit(1);
}

const connection = new Sequelize(dbConfig);

(async () => {
    try {
        await connection.authenticate();
        await connection.sync();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

export default connection;
