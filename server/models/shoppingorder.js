import mongoose from "mongoose";

const { Schema } = mongoose;

const shippingOrderSchema = new Schema(
  {
    billingDetails: {
      type: Object,
      required: true,
    },
    productDetails: {
      type: Object,
      required: true,
    },
    userDetails: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ShippingOrder", shippingOrderSchema);
