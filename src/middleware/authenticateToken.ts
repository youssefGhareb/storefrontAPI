import express, { NextFunction } from "express"
import jwt from 'jsonwebtoken'


export const verifyAuthToken = (req: express.Request, res: express.Response, next: NextFunction) => {

    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)

        next()
    } catch (error) {
        res.status(401)
        res.send(`Invalid JWT token : ${error}`)
    }
}