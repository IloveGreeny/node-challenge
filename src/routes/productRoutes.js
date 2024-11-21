import express from 'express';
import {
    createProduct, createRemainder, decreaseRemainder,
    getProductbyName,
    getProductbyPlu, getRemainderbyOrder,
    getRemainderbyPlu, getRemainderbyShelf,
    getRemainderbyShopId, increaseRemainder,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/product/plu/:plu/name/:name", getProductbyName);
router.get('/product/plu/:plu', getProductbyPlu);
router.get('/remainder/plu/:plu', getRemainderbyPlu);
router.get('/remainder/shopId/:shop_id', getRemainderbyShopId);
router.get('/remainder/shopId/:shop_id/shelfStorage/:shelf', getRemainderbyShelf);
router.get('/remainder/shopId/:shop_id/orderStorage/:order', getRemainderbyOrder);
router.post('/product', createProduct);
router.post('/remainder/', createRemainder);
router.patch('/remainder/remainderIncrease/shopId/:shop_id/plu/:plu', increaseRemainder);
router.patch('/remainder/remainderDecrease/shopId/:shop_id/plu/:plu', decreaseRemainder);



export default router;

