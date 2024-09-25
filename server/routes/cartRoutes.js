import express from "express";
import {
  addOrUpdateCartItem,
  getAllCarts,
  getCartByUserID,
  updateCartById,
  deleteCart,
  removeCartItem,
} from "../controller/cartController.js";

const router = express.Router();

// Route for creating a new cart
router.post("/add-or-update", addOrUpdateCartItem);

// Route for getting all carts
router.get("/get-all-carts", getAllCarts);

// Route for getting a cart by userID
router.get("/get-by-user-id/:userID", getCartByUserID);

// Route for updating an existing cart by id
router.put("/update-cart-by-id/:cartID", updateCartById);

// Route for deleting a cart by id
router.delete("/delete-by-id/:id", deleteCart);

// Route for deleting single item for cart
router.post("/remove-item/:userID/:itemID", removeCartItem);

export default router;
