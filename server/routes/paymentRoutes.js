import express from "express"
import { getPayments,getPaymentById,createPayment,updatePayment,deletePayment } from "../controller/paymentController.js";
const router = express.Router();

router.get('/payments', getPayments);
router.get('/payments/:id', getPaymentById);
router.post('/payments', createPayment);
router.put('/payments/:id', updatePayment);
router.delete('/payments/:id', deletePayment);

export default router;