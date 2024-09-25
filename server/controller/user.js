import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

async function sendEmail({ to, html }) {
  // Create a transporter for Outlook
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bilalimtiaz1999@gmail.com",
      pass: "vxjj tanm zewb gxxc", // Generate App-specific password
    },
    tls: {
      rejectUnauthorized: false, // This will bypass the certificate issue
    },
  });
  console.log(to);
  // Mail options
  let mailOptions = {
    from: "bilalimtiaz1999@gmail.com", // Sender address
    to,
    subject: "Update Password Verification COde",
    html: html, // Subject line
  };

  // Send mail with defined transport object
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
// Forgot Password - Send OTP
export const forgotPassword = async (req, res) => {
  try {
    //         const userFromToken = req.user;
    // console.log(userFromToken)
    const { email } = req.body;
    const emailToUse = email; // || (userFromToken && userFromToken.email);
    console.log(emailToUse);

    if (!emailToUse) {
      return res.status(400).json({ message: "Please enter your email" });
    }

    // Check if user exists with that email
    const user = await User.findOne({ email: emailToUse });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiration = Date.now() + 15 * 60 * 1000;

    // Save OTP and expiration in user data
    user.resetPasswordToken = otp;
    user.resetPasswordExpire = otpExpiration;
    await user.save();
    console.log(emailToUse);
    const htmlContent = `Your OTP for resetting your password is <strong>${otp}</strong> It is valid for 15 minutes.`;
    await sendEmail({ to: emailToUse, html: htmlContent });

    return res.status(200).json({
      message: "OTP sent to email. Please check your inbox.",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// Reset Password with OTP
export const resetPassword = async (req, res) => {
  try {
    // const userFromToken = req.user;
    // console.log('User from token:', userFromToken);

    const { email, otp, newPassword } = req.body;
    const emailToUse = email; // || (userFromToken && userFromToken.email);
    console.log("Email:", emailToUse);
    console.log("OTP:", otp);
    console.log("New Password:", newPassword);

    if (!emailToUse || !otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Check if user exists
    const user = await User.findOne({ email: emailToUse });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    // Check if OTP is valid and not expired
    if (
      user.resetPasswordToken !== otp ||
      Date.now() > user.resetPasswordExpire
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and clear OTP
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).send("Server Error");
  }
};

// PUT: Update an item
export const updateData = async (req, res) => {
  try {
    const updatedItem = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updateData) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// FIND BY ID
export const getById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await User.findById(itemId);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.json(item);
  } catch (err) {
    res.status(400).send("Server error");
  }
};

// DELETE: Delete an item
export const deleteData = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
