import {
    getEventsbyActionService,
    getEventsbyDateService,
    getEventsbyPluService,
    getEventsbyShopIdService
} from "../models/eventModel.js";
import {handleRequest} from "./productController.js";


export const getEventsbyShopId = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const events = await getEventsbyShopIdService(req.params.shop_id,page,limit);
        if(!events || events.length === 0) return handleRequest(res,404,"Events not found");
        handleRequest(res,200,'Events found',events);
    }catch(err) {
        next(err);
    }
}

export const getEventsbyPlu = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const events = await getEventsbyPluService(req.params.plu,page,limit);
        if(!events || events.length === 0) return handleRequest(res,404,"Events not found");
        handleRequest(res,200,'Events found',events);
    }catch(err) {
        next(err);
    }
}

export const getEventsbyDate = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const events = await getEventsbyDateService(req.params.date,page,limit);
        if(!events || events.length === 0) return handleRequest(res,404,"Events not found");
        handleRequest(res,200,'Events found',events);
    }catch(err) {
        next(err);
    }
}

export const getEventsbyAction = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const events = await getEventsbyActionService(req.params.action,page,limit);
        if(!events || events.length === 0) return handleRequest(res,404,"Events not found");
        handleRequest(res,200,'Events found',events);
    }catch(err) {
        next(err);
    }
}