import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} from "../controller/shippingOrderController.js";

const router = express.Router();

// Create a new shipping order
router.post("/create", createOrder);

// Get all shipping orders
router.get("/get-all-orders", getAllOrders);

// Get a single shipping order by ID
router.get("/get-order-by-id/:id", getOrderById);

// Update a shipping order by ID
router.put("/update-order-by-id/:id", updateOrderById);

// Delete a shipping order by ID
router.delete("/delete-order-by-id/:id", deleteOrderById);

export default router;
