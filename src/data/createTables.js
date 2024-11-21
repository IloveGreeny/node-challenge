import pool from '../config/db.js';

export const createProductTable = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS products (
    shop_id SERIAL PRIMARY KEY,
    plu VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);`
    try {
        await pool.query(queryText);
    }catch(err) {
        console.log(err);
    }
}

export const createRemainderTable = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS remainders (
    shop_id SERIAL PRIMARY KEY,
    plu VARCHAR(50) UNIQUE NOT NULL,
    "order" INT NOT NULL DEFAULT 0,
    shelf INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);`
    try {
        await pool.query(queryText);
    }catch(err) {
        console.log(err);
    }
}

export const createEventsTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS events (
            shop_id SERIAL PRIMARY KEY,
            plu VARCHAR(50)  NOT NULL,
            action VARCHAR(50)  NOT NULL,
            date VARCHAR(50) NOT NULL
        );
    `;
    try {
        await pool.query(queryText);
    } catch (err) {
        console.error("Error creating events table:", err);
    }
};