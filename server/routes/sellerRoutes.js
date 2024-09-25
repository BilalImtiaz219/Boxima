import express from "express"
import { getSellers,getSellerById,createSeller,updateSeller,deleteSeller } from "../controller/sellerController.js";
const router = express.Router();

router.get('/sellers', getSellers);
router.get('/sellers/:id', getSellerById);
router.post('/sellers', createSeller);
router.put('/sellers/:id', updateSeller);
router.delete('/sellers/:id', deleteSeller);

export default router;