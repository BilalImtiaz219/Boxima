import Category from "../models/categories.js"; // Use this import for all functions

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single category
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ category_ID: req.params.id });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  const category = new Category({
    category_ID: req.body.category_ID,
    category_name: req.body.category_name,
    category_type: req.body.category_type,
  });
  try {
    const newCategory = await category.save();
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { category_ID: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      category_ID: req.params.id,
    });
    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
