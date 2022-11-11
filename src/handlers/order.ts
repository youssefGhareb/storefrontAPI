import express, { Request, Response } from 'express';
import { Order, orderStore } from '../models/order';
import { PurchasedProduct } from '../models/purchasedProduct';
import { verifyAuthToken } from '../middleware/authenticateToken';


const store = new orderStore();

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            id: null,
            user_id: req.body.user_id,
            status: req.body.status,
            products: null
        }

        const newOrder = await store.create(order);
        res.status(200);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const addProductToOrder = async (req: Request, res: Response) => {
    try {

        const purchase: PurchasedProduct = {
            id: undefined,
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity
        }

        const newOrder = await store.addProduct(purchase);
        res.status(200);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(req.body.user_id);
        res.status(200);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

}


const orderRoutes = (app:express.Application) => {
    app.get('/orders/:id',verifyAuthToken, show);
    app.post('/orders',verifyAuthToken, create);
    app.post('/orders/add',verifyAuthToken, addProductToOrder);
};

export default orderRoutes;