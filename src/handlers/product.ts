import express, { Request, Response } from 'express';
import { Product, productStore } from '../models/product';
import { verifyAuthToken } from '../middleware/authenticateToken';


const store = new productStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.status(200);
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.body.id);
        res.status(200);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            id: null,
            name: req.body.name,
            price: req.body.price,
        }

        const newProduct = await store.create(product);
        res.status(200);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
};

export default productRoutes;