import Product from "@models/Product";
import { BaseProduct, Product as IProduct } from "types/Product";
import minioClient, { getAssignUrls } from "config/minio.config";

export async function createNewProduct(
    body: Partial<IProduct>
): Promise<BaseProduct> {
    if (!body.name && !body.description) {
        throw new Error(
            "Some required field (name, description, createdBy) is missing!"
        );
    }

    const newProduct = (await Product.create(body)).toJSON();

    if (newProduct.thumbnailUrls?.length) {
        newProduct.thumbnailUrls = await getAssignUrls(
            newProduct.thumbnailUrls
        );
    }

    return newProduct;
}

export async function getAllProducts(): Promise<BaseProduct[]> {
    const allProducts = await Product.findAll();

    const products = allProducts.map((product) => product.toJSON());

    const productsWithUrls = Promise.all(
        products.map(async (product) => {
            if (product.thumbnailUrls) {
                product.thumbnailUrls = await getAssignUrls(
                    product.thumbnailUrls
                );
            }
            return product;
        })
    );

    return productsWithUrls;
}

export async function getAllProductsByUserId(
    UserId: number
): Promise<BaseProduct[]> {
    const allProducts = await Product.findAll({
        where: {
            UserId,
        },
    });

    const products = allProducts.map((product) => product.toJSON());

    const productsWithUrls = Promise.all(
        products.map(async (product) => {
            if (product.thumbnailUrls) {
                product.thumbnailUrls = await getAssignUrls(
                    product.thumbnailUrls
                );
            }
            return product;
        })
    );

    return productsWithUrls;
}

export async function updateProductById(
    productId: string,
    updates: Product
): Promise<Product | null> {
    const id = parseInt(productId, 10);

    await Product.update(updates, {
        where: {
            id,
        },
    });

    return await Product.findByPk(productId);
}
