import * as Minio from "minio";

// Instantiate the minio client with the endpoint
// and access keys as shown below.
const minioClient = new Minio.Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: "AKIAIOSFODNN7EXAMPLE",
    secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
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

export default minioClient;
