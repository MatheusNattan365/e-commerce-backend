# Devx test
## _Before start_

Before start the server: 
    -   Certified that you have the Docker installed;
    -   Pull one image to postgres and one image to minio;
    -   Set your personal configuration of MailTrap

# MINIO
# - GNU/Linux and macOS
```sh
docker run \
  -p 9000:9000 \
  -p 9001:9001 \
  --name minio1 \
  -v ~/minio/data:/data \
  -e "MINIO_ROOT_USER=AKIAIOSFODNN7EXAMPLE" \
  -e "MINIO_ROOT_PASSWORD=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" \
  quay.io/minio/minio server /data --console-address ":9001"
```
# - WINDOWS
```sh
docker run \
  -p 9000:9000 \
  -p 9001:9001 \
  --name minio1 \
  -v D:\data:/data \
  -e "MINIO_ROOT_USER=AKIAIOSFODNN7EXAMPLE" \
  -e "MINIO_ROOT_PASSWORD=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" \
  quay.io/minio/minio server /data --console-address ":9001"
  ```
# POSTGRES

```sh
$ docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```
# Mailtrap

```sh
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: ,
  auth: {
    user: "",
    pass: ""
  }
});
```
