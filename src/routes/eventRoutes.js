import express from 'express';
import {getEventsbyAction, getEventsbyDate, getEventsbyPlu, getEventsbyShopId} from "../controllers/eventController.js";

const router = express.Router();


router.get("/events/shopId/:shop_id", getEventsbyShopId);
router.get("/events/plu/:plu", getEventsbyPlu);
router.get("/events/date/:date", getEventsbyDate);
router.get("/events/action/:action", getEventsbyAction);


export default router;