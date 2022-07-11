/**
 * Required External Modules and Interfaces
 */

import express, { NextFunction, Request, Response } from "express";
import * as productsService from "@services/product";
import { BaseProduct, Product, Products } from "types/Product";
import minioClient from "config/minio.config";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

/**
 * Router Definition
 */

const productsRouter = express.Router();

/**
 * Controller Definitions
 */

// POST     -  createProduct
productsRouter.post(
    "/",
    upload.array("product_photo", 3),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = { ...req.body, thumbnailUrls: [] };

            if (req.files) {
                const productPhotos = Object.values(req.files);

                return await Promise.all(
                    productPhotos.map(async (productPhoto) => {
                        const productPhotoName = `${
                            productPhoto.filename
                        }-${new Date().toJSON()}`;

                        await minioClient.fPutObject(
                            "devx",
                            productPhotoName,
                            productPhoto.path
                        );

                        product.thumbnailUrls.push(productPhotoName);
                        // console.log("==@ln46", product);
                    })
                )
                    .then(() => productsService.createNewProduct(product))
                    .then((newProduct) => res.status(201).json(newProduct));
            }

            const newProduct = await productsService.createNewProduct(product);

            res.status(201).json(newProduct);
        } catch (e) {
            res.status(500).send((e as any).message);
        }
    }
);

// GET      - allProducts
productsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const allusers = await productsService.getAllProducts();

        res.status(201).json(allusers);
    } catch (e) {
        res.status(500).send((e as any).message);
    }
});

export default productsRouter;

// POST items

// PUT items/:id

// DELETE items/:id
