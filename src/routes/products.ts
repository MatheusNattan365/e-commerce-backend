/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as productsService from "@services/product";
import { BaseProduct, Product, Products } from "types/Product";

/**
 * Router Definition
 */

const productsRouter = express.Router();

/**
 * Controller Definitions
 */

// POST     -  createProduct
productsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const product: BaseProduct = req.body;

        const newProduct = await productsService.createNewProduct(product);

        res.status(201).json(newProduct);
    } catch (e) {
        res.status(500).send((e as any).message);
    }
});

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
