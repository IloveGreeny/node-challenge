import pool from '../config/db.js';

export const getProductbyNameService = async (plu,name) => {
    const result = await pool.query(
        `SELECT * FROM products WHERE name = $1 AND plu = $2`,
        [name, plu]
    );
    return result.rows[0];
}

export const getProductbyPluService = async (plu) => {
    const result = await pool.query(`SELECT * FROM products WHERE plu = '${plu}'`);
    return result.rows[0];
}

export const getRemainderbyPluService = async (plu) => {
    const result = await pool.query(`SELECT * FROM remainders WHERE plu = '${plu}'`);
    return result.rows[0];
}

export const getRemainderbyShopIdService = async (shop_id) => {
    const result = await pool.query(`SELECT * FROM remainders WHERE shop_id = '${shop_id}'`);
    return result.rows[0];
}

export const getRemainderbyShelfService = async (shop_id,shelf) => {
    const result = await pool.query(
        `SELECT * FROM remainders WHERE shop_id = $1 AND shelf = $2`,
        [shop_id, shelf]
    );
    return result.rows[0];
}

export const getRemainderbyOrderService = async (shop_id,order) => {
    const result = await pool.query(
        `SELECT * FROM remainders WHERE shop_id = $1 AND "order" = $2`,
        [shop_id, order]
    );
    return result.rows[0];
}

export const createProductService = async (plu,name) => {
    const result = await pool.query('INSERT INTO products (plu,name) VALUES ($1,$2) RETURNING *', [plu,name]);
    return result.rows[0];
}

export const createRemainderService = async (plu,order,shelf) => {
    const result = await pool.query(
        'INSERT INTO remainders (plu, "order", shelf) VALUES ($1, $2, $3) RETURNING *',
        [plu, order, shelf]
    );
    return result.rows[0];
}

export const increaseRemainderService = async (plu,order,shelf,shop_id) => {

    const currentResult = await pool.query(
        'SELECT "order", shelf FROM remainders WHERE shop_id=$1 AND plu=$2',
        [shop_id,plu]
    );

    const { order: currentOrder, shelf: currentShelf } = currentResult.rows[0];

    let validationError = null;

    switch (true) {
        case order <= currentOrder && shelf <= currentShelf:
            validationError = `The new Shelf and Order quantities can't be less than (Shelf:${currentShelf}) and (Order:${currentOrder}).`
            break;
        case order <= currentOrder:
            validationError = `The new Order quantity can't be less than (${currentOrder}).`;
            break;
        case shelf <= currentShelf:
            validationError = `The new Shelf quantity can't be less than (${currentShelf}).`;
            break;
        default:
            break;
    }

    if (validationError) {
        throw new Error(validationError);
    }else {
        const result = await pool.query(
            'UPDATE remainders SET "order"=$1, shelf=$2 WHERE shop_id=$3 AND plu=$4 RETURNING *',
            [order,shelf, shop_id,plu]
        );
        return result.rows[0];
    }
}

export const decreaseRemainderService = async (plu,order,shelf,shop_id) => {
    const currentResult = await pool.query(
        'SELECT "order", shelf FROM remainders WHERE shop_id=$1 AND plu=$2',
        [shop_id,plu]
    );

    const { order: currentOrder, shelf: currentShelf } = currentResult.rows[0];

    let validationError = null;

    switch (true) {
        case order >= currentOrder && shelf >= currentShelf:
            validationError = `The new Shelf and Order quantities can't be bigger than (Shelf:${currentShelf}) and (Order:${currentOrder}).`
            break;
        case order >= currentOrder:
            validationError = `The new Order quantity can't be bigger than (${currentOrder}).`;
            break;
        case shelf >= currentShelf:
            validationError = `The new Shelf quantity can't be bigger than (${currentShelf}).`;
            break;
        default:
            break;
    }

    if (validationError) {
        throw new Error(validationError);
    }else {
        const result = await pool.query(
            'UPDATE remainders SET "order"=$1, shelf=$2 WHERE shop_id=$3 AND plu=$4 RETURNING *',
            [order,shelf, shop_id,plu]
        );
        return result.rows[0];
    }
}
