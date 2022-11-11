import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import userRoutes from './handlers/user'
import productRoutes from './handlers/product';
import orderRoutes from './handlers/order';

dotenv.config();

const app: express.Application = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())  

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app
