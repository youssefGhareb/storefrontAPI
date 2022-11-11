import Client from "../database";


export type PurchasedProduct = {
    id: number | undefined,
    order_id: number | undefined,
    product_id: number,
    quantity: number
}

export class purchasedProductStore {

    async create(purchasedProduct: PurchasedProduct): Promise<PurchasedProduct>{
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO purchases (order_id, product_id,quantity) Values ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [purchasedProduct.order_id,purchasedProduct.product_id,purchasedProduct.quantity]);

            conn.release;
            return result.rows[0];
        } catch(err){
            throw new Error(`Could not insert product information. Error : ${err}`)
        };
    }
}