import express from 'express';
import { getProductById,getProductsByCategory } from '../controllers/productController.js';

const router = express.Router();

    router.get('/productById/:productId', getProductById);
router.get('/productByCategory', getProductsByCategory);


export default router;