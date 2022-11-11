import Client from "../database";

export type Product = {
    id: number | null,
    name: string,
    price: number,
};

export class productStore {
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    };

    async show(id:string): Promise<Product>{
        try{
            const conn = await Client.connect();
            const sql = "SELECT * FROM products WHERE id = ($1)"

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch(err){
            throw new Error(`Could not retrieve user information. Error : ${err}`);
        }
    }

    async create(product: Product): Promise<Product>{
        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name, price) Values ($1, $2) RETURNING *';
            const result = await conn.query(sql, [product.name,product.price]);

            conn.release;
            return result.rows[0];
        } catch(err){
            throw new Error(`Could not insert product information. Error : ${err}`)
        };
    }
}

