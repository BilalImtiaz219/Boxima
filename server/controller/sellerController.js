import Seller from "../models/seller.js";

// Get all sellers
export const getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().populate("product_ID");
    res.json(sellers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single seller
export const getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findOne({ seller_ID: req.params.id }).populate(
      "product_ID"
    );
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.json(seller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new seller
export const createSeller = async (req, res) => {
  const seller = new Seller({
    seller_ID: req.body.seller_ID,
    product_ID: req.body.product_ID,
    name: req.body.name,
  });
  try {
    const newSeller = await seller.save();
    res.status(200).json(newSeller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a seller
export const updateSeller = async (req, res) => {
  try {
    const updatedSeller = await Seller.findOneAndUpdate(
      { seller_ID: req.params.id },
      req.body,
      { new: true }
    ).populate("product_ID");
    if (!updatedSeller)
      return res.status(404).json({ message: "Seller not found" });
    res.json(updatedSeller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteSeller = async (req, res) => {
  try {
    const deletedSeller = await Seller.findOneAndDelete({
      seller_ID: req.params.id,
    });
    if (!deletedSeller)
      return res.status(404).json({ message: "Seller not found" });
    res.json({ message: "Seller deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
