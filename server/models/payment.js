import mongoose from "mongoose";
const paymentSchema = mongoose.Schema;

const payment = new paymentSchema({
  payment_ID: { type: Number, required: true, unique: true },
  customer_ID: { type: Number, ref: "Customer", required: true },
  category_ID: { type: Number, ref: "Category", required: true },
});

const Payment = mongoose.model("Payment", payment);
export default Payment;
