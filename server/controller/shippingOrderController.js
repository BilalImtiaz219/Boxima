import ShippingOrder from "../models/shoppingorder.js";
import Cart from "../models/cart.js";

// Create a new shipping order
export const createOrder = async (req, res) => {
  try {
    const { _id } = req.body.userDetails || {};
    const newOrder = new ShippingOrder(req.body);
    await newOrder.save();
    if (_id) {
      await Cart.deleteOne({ userID: _id });
    }
    res.status(200).json({ message: "Order Placed Successfully", newOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all shipping orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await ShippingOrder.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single shipping order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await ShippingOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a shipping order by ID
export const updateOrderById = async (req, res) => {
  try {
    const order = await ShippingOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a shipping order by ID
export const deleteOrderById = async (req, res) => {
  try {
    const order = await ShippingOrder.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
