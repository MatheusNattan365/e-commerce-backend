import Product from "@models/Product";
import { BaseProduct, Product as IProduct } from "types/Product";
import minioClient from "config/minio.config";

export async function createNewProduct(body: BaseProduct): Promise<Product> {
    if (!body.name && !body.description) {
        throw new Error(
            "Some required field (name, description, createdBy) is missing!"
        );
    }

    return await Product.create(body);
}

export async function getAllProducts(): Promise<Product[]> {
    return Product.findAll();
}
