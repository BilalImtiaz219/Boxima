import Cart from "../models/cart.js";
import Product from "../models/products.js";

// Add a product to the cart
export const addProductToCart = async (req, res) => {
  try {
    // Find the cart by its ID (assumes req.params.cartId is the MongoDB ObjectId)
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    // Find the product by its MongoDB ObjectId (assumes req.body.productId is the ObjectId)
    const product = await Product.findById(req.body.productId);
    if (!product) return res.status(400).json({ message: "Product not found" });

    // Add product to the cart's products array
    cart.products.push(product._id);
    await cart.save();

    // Add cart reference to the product's carts array
    product.carts.push(cart._id);
    await product.save();

    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    // Fetch all products and populate their category information (if any)
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single product by its MongoDB ObjectId
export const getProductById = async (req, res) => {
  try {
    // Find the product by its ObjectId (from the URL params)
    const product = await Product.findById(req.params.id).populate(
      "category_ID"
    );
    if (!product) return res.status(400).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image, // Ensure image path is optional
  });
  try {
    const newProduct = await product.save();
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a product by its ObjectId
export const updateProduct = async (req, res) => {
  try {
    // Update the product details based on its ObjectId
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("category_ID");
    if (!updatedProduct)
      return res.status(400).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product by its ObjectId
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(400).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
