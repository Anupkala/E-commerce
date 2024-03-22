// routers/orderRouter.js
import express from 'express';
import { placeOrder, getOrderHistory, getOrderById, cancelOrder } from '../controllers/orderController.js';
import { authenticateUser } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/place/:userId',authenticateUser, placeOrder);
router.get('/history/:userId',authenticateUser, getOrderHistory);
router.get('/:id/:userId',authenticateUser, getOrderById);
router.post('/cancel/:userId',authenticateUser, cancelOrder);

export default router;
