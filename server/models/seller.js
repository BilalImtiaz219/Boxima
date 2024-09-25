import mongoose from 'mongoose';
const sellerSchema = mongoose.Schema;

const seller = new sellerSchema({
    seller_ID: { type: Number, required: true, unique: true },
    product_ID: { type: Number, ref: 'Product', required: true },
    name: { type: String, required: true }
});

const Seller = mongoose.model('Seller', seller);
export default Seller;