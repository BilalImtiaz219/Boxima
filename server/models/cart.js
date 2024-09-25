import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the item schema with default _id
const itemSchema = new Schema({
  productID: { type: String, required: true },
  quantity: { type: Number, required: true }
}, { _id: true }); // Ensure _id is included

// Define the cart schema
const cartSchema = new Schema({
  userID: {
    type: Object,
    ref: "User",
    required: true,
  },
  items: {
    type: [itemSchema],
    required: true,
    default: []
  }
});

/// Check if the model is already defined before defining it again
const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;