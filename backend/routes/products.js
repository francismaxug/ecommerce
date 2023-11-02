import express from 'express';
const router = express.Router();
import { allProducts, getAproduct } from '../controllers/productsController.js';



router.route("/products").get(allProducts)
router.route("/products/:id").get(getAproduct)

export default router