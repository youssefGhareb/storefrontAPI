import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV
} = process.env 

let Client:Pool
console.log(ENV);   

if(ENV === 'dev') {
    Client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    })
  }
  else{
    Client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_TEST_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    })
  }

export default Client;