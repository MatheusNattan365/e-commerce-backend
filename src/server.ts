/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import connection from "./config/sequelize";
import minioClient from "./config/minio.config";

const db = connection;
const mc = minioClient;

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

/**
 * Server Activation
 */

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
});
