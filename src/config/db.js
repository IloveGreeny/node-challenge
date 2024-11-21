import pkg from 'pg';
import * as dotenv from "dotenv";
const {Pool} = pkg;


dotenv.config();

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});

pool.on("connect", ()=> {
    console.log('Connected to DB...');
});

export default pool;