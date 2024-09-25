import express from "express"
import { getCategories,getCategoryById,createCategory,updateCategory,deleteCategory } from "../controller/categoryController.js";
const router = express.Router();


router.get('/get', getCategories);
router.get('/getbyid/:id', getCategoryById);
router.post('/create', createCategory);
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);

export default router;