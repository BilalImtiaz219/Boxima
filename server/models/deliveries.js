import mongoose from 'mongoose';
const deliverySchema = mongoose.Schema;

const delivery = new deliverySchema({
    deliveries_ID: { type: Number, required: true, unique: true },
    customer_ID: { type: Number, ref: 'Customer', required: true },
    date: { type: Date, required: true }
});

const Delivery = mongoose.model('Delivery', delivery);
export default Delivery;