import express from "express"
import { getTransactionReports,getTransactionReportById,createTransactionReport,updateTransactionReport,deleteTransactionReport } from "../controller/transactionReportController.js";
const router = express.Router();

router.get('/transactionReports', getTransactionReports);
router.get('/transactionReports/:id', getTransactionReportById);
router.post('/transactionReports', createTransactionReport);
router.put('/transactionReports/:id', updateTransactionReport);
router.delete('/transactionReports/:id', deleteTransactionReport);

export default router;