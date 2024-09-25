import express from "express"
import { getDeliveries,getDeliveryById,createDelivery,updateDelivery,deleteDelivery } from "../controller/deliveryController.js";
const router = express.Router();

router.get('/deliveries', getDeliveries);
router.get('/deliveries/:id', getDeliveryById);
router.post('/deliveries', createDelivery);
router.put('/deliveries/:id', updateDelivery);
router.delete('/deliveries/:id', deleteDelivery);

export default router;