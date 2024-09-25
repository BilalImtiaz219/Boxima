import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const customerSchema = mongoose.Schema({
    customer_ID: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: false },
    carts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        }
    ]
});



const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
