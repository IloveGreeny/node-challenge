import pool from '../config/db.js';
import {format} from 'date-fns';

export const getEventsbyShopIdService = async (shop_id,page,limit) => {
    const offset = (page - 1) * limit;
    const result = await pool.query(
        `SELECT * FROM events WHERE shop_id = $1 LIMIT $2 OFFSET $3`,
        [shop_id, limit, offset]
    );
    return result.rows;
}

export const getEventsbyPluService = async (plu,page,limit) => {
    const offset = (page - 1) * limit;
    const result = await pool.query(
        `SELECT * FROM events WHERE plu = $1 LIMIT $2 OFFSET $3`,
        [plu, limit, offset]
    );
    return result.rows;
}

export const getEventsbyDateService = async (date,page,limit) => {
    const offset = (page - 1) * limit;
    const result = await pool.query(
        `SELECT * FROM events WHERE date = $1 LIMIT $2 OFFSET $3`,
        [date, limit, offset]
    );
    return result.rows.map(event => ({
        ...event,
        date: format(new Date(event.date), 'MMMM dd, yyyy'),
    }));
}

export const getEventsbyActionService = async (action,page,limit) => {
    const offset = (page - 1) * limit;
    const result = await pool.query(
        `SELECT * FROM events WHERE action = $1 LIMIT $2 OFFSET $3`,
        [action, limit, offset]
    );
    return result.rows;
}

export const createEventService = async (plu, date, action) => {
    const timestamp = format(new Date(), 'yyyy-MM-dd');
    const result = await pool.query(
        'INSERT INTO events (plu, date, action) VALUES ($1, $2, $3) RETURNING *',
        [plu, timestamp, action]
    );
    return result.rows[0];
}
