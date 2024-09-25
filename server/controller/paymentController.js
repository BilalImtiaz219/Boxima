import Payment from "../models/payment.js";
// Get all payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("customer_ID order_ID");
    res.json(payments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single payment
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      payment_ID: req.params.id,
    }).populate("customer_ID order_ID");
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new payment
export const createPayment = async (req, res) => {
  const payment = new Payment({
    payment_ID: req.body.payment_ID,
    customer_ID: req.body.customer_ID,
    order_ID: req.body.order_ID,
    amount: req.body.amount,
    date: req.body.date,
  });
  try {
    const newPayment = await payment.save();
    res.status(200).json(newPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a payment
export const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { payment_ID: req.params.id },
      req.body,
      { new: true }
    ).populate("customer_ID order_ID");
    if (!updatedPayment)
      return res.status(404).json({ message: "Payment not found" });
    res.json(updatedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a payment
export const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findOneAndDelete({
      payment_ID: req.params.id,
    });
    if (!deletedPayment)
      return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
