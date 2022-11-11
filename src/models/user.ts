import Client from "../database";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';

export type User = {
    id: number | null,
    firstName: string,
    lastName: string | null,
    password: string
};

export class userStore {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';

            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    };

    async show(id:string): Promise<User>{
        try{
            const conn = await Client.connect();
            const sql = "SELECT * FROM users WHERE id = ($1)"

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch(err){
            throw new Error(`Could not retrieve user information. Error : ${err}`);
        }
    }

    async create(user: User): Promise<User>{
        dotenv.config();
        const {
            BCRYPT_PASSWORD,
            SALT_ROUNDS
        } = process.env;

        try{
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstName, lastName, password) Values ($1, $2, $3) RETURNING *';

            const pepper = BCRYPT_PASSWORD;
            const saltRounds:string = SALT_ROUNDS as string;

            const hash = bcrypt.hashSync(
                user.password + pepper, 
                parseInt(saltRounds)
             );
            const result = await conn.query(sql, [user.firstName,user.lastName,hash]);
            conn.release;
            return result.rows[0];
        } catch(err){
            throw new Error(`Could not insert user information. Error : ${err}`)
        };
    }

    async login(user:User): Promise<User | null>{
        const {BCRYPT_PASSWORD} = process.env;
        const pepper = BCRYPT_PASSWORD;
        try{
            const conn = await Client.connect();
            const sql = "SELECT password FROM users WHERE firstname = ($1)"

            const result = await conn.query(sql, [user.firstName]);

            conn.release();

            if(result.rows.length){
                const u = result.rows[0];
                if(bcrypt.compareSync(user.password+pepper,u.password)){
                    return u;
                }
            }

            return null;
        } catch(err){
            throw new Error(`Could not retrieve user information. Error : ${err}`);
        }
    }
}

