import express from "express";
import {getCustomers,getCustomerById,registerAndCreateCustomer,updateCustomer,deleteCustomer,loginCustomer} from "../controller/customerController.js";

const router = express.Router();

router.get('/get', getCustomers);
router.get('/getbyid/:id', getCustomerById);
router.post('/create', registerAndCreateCustomer);
router.put('/update/:id', updateCustomer);
router.delete('/delete/:id', deleteCustomer);
router.post('/login', loginCustomer);

export default router;
