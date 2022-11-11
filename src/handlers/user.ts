import express, { Request, Response } from 'express';
import { User, userStore } from '../models/user';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middleware/authenticateToken';

const store = new userStore();

const index = async (_req: Request, res: Response) => {
    try{
        const users = await store.index();
        res.status(200)
        res.json(users);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const login = async (req: Request, res: Response) => {
    try{
        const user = await store.login({
            firstName: req.body.firstname,
            password: req.body.password,
            lastName: null,
            id: null
        })
        res.status(200);
        res.json(user)
    }  catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.body.id);
        res.status(200)
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

}

const create = async (req: Request, res: Response) => {

    const secret: string = process.env.TOKEN_SECRET as string;

    try {
        const user: User = {
            id: null,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }

        const newUser = await store.create(user);
        var token = jwt.sign({ user: newUser }, secret);
        res.status(200)
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.post('/users/login', verifyAuthToken, login);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', verifyAuthToken, create);
};

export default userRoutes;