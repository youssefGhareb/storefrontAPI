import Client from "../database";
import { PurchasedProduct } from "./purchasedProduct";

export type Order = {
    id: number | null,
    user_id: number,
    products: Array<PurchasedProduct> | null,
    status: string
}

export class orderStore {

    async show(user_id:string): Promise<Order>{
        try{

            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE user_id = ($1)"

            const result = await conn.query(sql, [user_id]);

            const sql2 = "SELECT product_id, quantity FROM purchases WHERE order_id = ($1)"

            const order_id = result.rows[0].id;
            const result2 = await conn.query(sql2, [order_id]);

            const order: Order = {
                id: result.rows[0].id,
                user_id: result.rows[0].user_id,
                status: result.rows[0].status,
                products: [{
                    id:undefined,
                    order_id:undefined,
                    product_id: result2.rows[0].product_id,
                    quantity: result2.rows[0].quantity
                }]
            }

            conn.release();
            return order;
        } catch(err){
            throw new Error(`Could not retrieve order information. Error : ${err}`);
        }
    }

    async create(order: Order): Promise<Order>{
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (user_id, status) Values ($1, $2) RETURNING *';
            const result = await conn.query(sql, [order.user_id,order.status]);

            conn.release;
            return result.rows[0];
        } catch(err){
            throw new Error(`Could not insert order information. Error : ${err}`)
        };
    }

    async addProduct(purchase:PurchasedProduct): Promise<PurchasedProduct>{
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO purchases (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [purchase.order_id,purchase.product_id,purchase.quantity])
            conn.release
            return result.rows[0];
        } catch (err){
            throw new Error(`Could not add product to order. Error : ${err}`)
        }
    }
}