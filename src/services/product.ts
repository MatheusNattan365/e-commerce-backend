import Product from "@models/Product";
import { Product as IProduct } from "types/Product";

export async function createNewProduct(body: IProduct): Promise<Product> {
    if (!body.name && !body.description && !body.createdBy) {
        throw new Error(
            "Some required field (name, description, createdBy) is missing!"
        );
    }

    return await Product.create(body);
}

export async function getAllUsers(): Promise<Product[]> {
    return Product.findAll();
}
