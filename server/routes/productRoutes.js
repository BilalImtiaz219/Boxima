import express from "express";
import upload from "../utils/helper.js";
import {getProducts,getProductById,createProduct,updateProduct,deleteProduct,addProductToCart} from "../controller/productController.js";

const router = express.Router();
router.get('/get', getProducts);
router.get('/:id', getProductById);
router.post('/create',upload.array('images', 5) ,createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/addtocart/:id/carts', addProductToCart);

export default router;
