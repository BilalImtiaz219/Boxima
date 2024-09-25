import Delivery from "../models/deliveries.js";
// Get all deliveries
export const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate("customer_ID");
    res.json(deliveries);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single delivery
export const getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findOne({
      deliveries_ID: req.params.id,
    }).populate("customer_ID");
    if (!delivery)
      return res.status(404).json({ message: "Delivery not found" });
    res.json(delivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new delivery
export const createDelivery = async (req, res) => {
  const delivery = new Delivery({
    deliveries_ID: req.body.deliveries_ID,
    customer_ID: req.body.customer_ID,
    date: req.body.date,
    status: req.body.status,
  });
  try {
    const newDelivery = await delivery.save();
    res.status(200).json(newDelivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a delivery
export const updateDelivery = async (req, res) => {
  try {
    const updatedDelivery = await Delivery.findOneAndUpdate(
      { deliveries_ID: req.params.id },
      req.body,
      { new: true }
    ).populate("customer_ID");
    if (!updatedDelivery)
      return res.status(404).json({ message: "Delivery not found" });
    res.json(updatedDelivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a delivery
export const deleteDelivery = async (req, res) => {
  try {
    const deletedDelivery = await Delivery.findOneAndDelete({
      deliveries_ID: req.params.id,
    });
    if (!deletedDelivery)
      return res.status(404).json({ message: "Delivery not found" });
    res.json({ message: "Delivery deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
