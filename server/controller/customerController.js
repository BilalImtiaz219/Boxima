import Customer from "../models/customers.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerAndCreateCustomer = async (req, res) => {
  try {
    const { customer_ID, name, email, password, phone } = req.body;

    // Validate required fields
    if (!customer_ID || !name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the customer
    const customer = new Customer({
      customer_ID,
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const newCustomer = await customer.save();

    res.status(200).json({
      message: "Customer registered and created successfully",
      success: true,
      data: newCustomer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email:", email);
    console.log("Password:", password);

    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Stored Hashed Password:", customer.password);

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: customer._id, name: customer.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Customer logged in successfully",
      success: true,
      data: customer,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single customer
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({ customer_ID: req.params.id });
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a customer
export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { customer_ID: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedCustomer)
      return res.status(404).json({ message: "Customer not found" });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a customer
export const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({
      customer_ID: req.params.id,
    });
    if (!deletedCustomer)
      return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
