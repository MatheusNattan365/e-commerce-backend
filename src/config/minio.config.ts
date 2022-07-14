import * as Minio from "minio";
import dotenv from "dotenv";

dotenv.config();

// Instantiate the minio client with the endpoint
// and access keys as shown below.
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_HOST!,
    port: parseInt(process.env.MINIO_PORT!, 10),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY!,
    secretKey: process.env.MINIO_SECRET_KEY!,
});

Promise.resolve(minioClient.bucketExists("devx")).then((res) => {
    if (!res) {
        minioClient.makeBucket("devx", "us-east-1", function (err) {
            if (err) return console.log(err);
            console.log('Devx Bucket created successfully in "us-east-1".');
        });
        return minioClient;
    }
    console.log("The Devx Bucket already exists.");
    return minioClient;
});

export function getAssignUrls(names: string[]): Promise<string[]> {
    return Promise.all(
        names.map((name) => minioClient.presignedUrl("GET", "devx", name))
    );
}

export default minioClient;
