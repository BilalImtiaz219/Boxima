import Order from "../models/shoppingorder.js";
// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer_ID product_ID");
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ order_ID: req.params.id }).populate(
      "customer_ID"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  const order = new Order({
    order_ID: req.body.order_ID,
    customer_ID: req.body.customer_ID,
    date: req.body.date,
  });
  try {
    const newOrder = await order.save();
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { order_ID: req.params.id },
      req.body,
      { new: true }
    ).populate("customer_ID product_ID");
    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({
      order_ID: req.params.id,
    });
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
