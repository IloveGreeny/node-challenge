import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import pool from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

import {createEventsTable, createProductTable,createRemainderTable} from './data/createTables.js';
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', eventRoutes);

app.use(errorHandler);

createProductTable();
createRemainderTable();
createEventsTable();

app.get('/', async (req, res) => {
    const result = await pool.query('SELECT current_database()');
    res.send(`The db name is ${result.rows[0].current_database}`)
})

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})