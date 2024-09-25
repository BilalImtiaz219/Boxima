import mongoose from "mongoose";

const userSchema = mongoose.Schema;
const user = new userSchema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "At least 8 characters required"],
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],  // Define the allowed values using enum
        default: "user",
    },
    image: {
        type: String,
        required: false,
    },
    carts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        }
    ],
    resetPasswordToken: String,  // Token for password reset
    resetPasswordExpires: Date,  // Expiry time for reset token
}, {
    timestamps: true,
});

const User = mongoose.model("User", user);
export default User;
