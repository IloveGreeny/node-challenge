import {
    createProductService, createRemainderService, decreaseRemainderService,
    getProductbyNameService,
    getProductbyPluService,
    getRemainderbyPluService,
    increaseRemainderService,
} from "../models/productModel.js";
import {createEventService} from "../models/eventModel.js";
import pool from "../config/db.js";

export const handleRequest = async (res, status, message, data=null ) => {
    res.status(status).send({
        status,
        message,
        data,
    })
};

export const getProductbyName = async (req, res, next) => {
    try {
        const product = await getProductbyNameService(req.params.plu,req.params.name);
        if(!product) return handleRequest(res,404,"Product not found");
        await createEventService(req.params.plu,null,req.method);
        handleRequest(res,200,'Product found',product);
    }catch(err) {
        next(err);
    }
}

export const getProductbyPlu = async (req, res, next) => {
    try {
        const product = await getProductbyPluService(req.params.plu);
        if(!product) return handleRequest(res,404,"Product not found");
        await createEventService(req.params.plu,null,req.method);
        handleRequest(res,200,'Product found by PLU',product);
    }catch (err) {
        next(err);
    }
}

export const getRemainderbyPlu = async (req, res, next) => {
    try {
        const remainder = await getRemainderbyPluService(req.params.plu);
        if(!remainder) return handleRequest(res,404,"Remainder not found");
        await createEventService(req.params.plu,null,req.method);
        handleRequest(res,200,'Remainder found by PLU',remainder);
    }catch (err) {
        next(err);
    }
}

export const getRemainderbyShopId = async (req, res, next) => {
   try {
       const result = await pool.query(
           `SELECT * FROM remainders WHERE shop_id = $1`,
           [req.params.shop_id]
       );
       const remainder = result.rows[0];
       if (remainder) {
           await createEventService(remainder.plu, null, req.method);
       }
       if (!remainder) return handleRequest(res, 404, "Remainder not found");
       handleRequest(res, 200, 'Remainder found by Shop ID', remainder);
    }catch (err) {
        next(err);
    }
}

export const getRemainderbyShelf = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT * FROM remainders WHERE shop_id = $1 AND shelf = $2`,
            [req.params.shop_id, req.params.shelf]
        );
        const remainder = result.rows[0];
        if (remainder) {
            await createEventService(remainder.plu, null, req.method);
        }
        if (!remainder) return handleRequest(res, 404, "Remainder not found");
        handleRequest(res, 200, 'Remainder found by Shelf Count', remainder);
    }catch (err) {
        next(err);
    }
}

export const getRemainderbyOrder = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT * FROM remainders WHERE shop_id = $1 AND "order" = $2`,
            [req.params.shop_id, req.params.order]
        );
        const remainder = result.rows[0];
        if (remainder) {
            await createEventService(remainder.plu, null, req.method);
        }
        if (!remainder) return handleRequest(res, 404, "Remainder not found");
        handleRequest(res, 200, 'Remainder found by Order Count', remainder);
    }catch (err) {
        next(err);
    }
}

export const createProduct = async (req, res,next) => {
    const { plu, name,} = req.body;
    try {
        const newProduct = await createProductService(plu,name);
        if(!newProduct) return handleRequest(res,404,"Product not able to be created");
        await createEventService(plu,null,req.method);
        handleRequest(res,201,'Product created successfully',newProduct);
    }catch(err) {
        next(err);
    }
}

export const createRemainder = async (req, res,next) => {
    const { plu, order, shelf} = req.body;
    try {
        const newRemainder = await createRemainderService(plu,order,shelf);
        if(!newRemainder) return handleRequest(res,404,"Remainder not able to be created");
        await createEventService(plu,null,req.method);
        handleRequest(res,201,'Remainder created successfully',newRemainder);
    }catch(err) {
        next(err);
    }
}

export const increaseRemainder = async (req, res,next) => {
    const { order,shelf } = req.body;
    try{
        const increasedRemainder = await increaseRemainderService(req.params.plu,order,shelf,req.params.shop_id);
        if(!increasedRemainder) return handleRequest(res,404,"Remainder not found");
        await createEventService(req.params.plu,null,req.method);
        handleRequest(res,200,'Remainder Order and Shelf Updated', increasedRemainder);
    }catch(err) {
        next(err);
    }
}

export const decreaseRemainder = async (req, res,next) => {
    const { order,shelf } = req.body;
    try{
        const decreasedRemainder = await decreaseRemainderService(req.params.plu,order,shelf,req.params.shop_id);
        if(!decreasedRemainder) return handleRequest(res,404,"Remainder not found");
        await createEventService(req.params.plu,null,req.method);
        handleRequest(res,200,'Remainder Order and Shelf Updated', decreasedRemainder);
    }catch(err) {
        next(err);
    }
}