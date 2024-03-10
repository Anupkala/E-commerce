// routers/cartRouter.js
import express from 'express';
import { addToCart, removeFromCart, updateCart, viewCart,clearCart } from '../controllers/cartController.js';
import { authenticateUser } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/add/:cart_id',authenticateUser, addToCart);
router.delete('/remove/:cart_id/:productId', authenticateUser,removeFromCart);
router.put('/update/:cart_id/:productId',authenticateUser, updateCart);
router.get('/view/:cart_id',authenticateUser, viewCart);
router.delete('/clear/:cart_id', authenticateUser, clearCart);

export default router;
