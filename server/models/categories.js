import mongoose from 'mongoose';
const categorySchema = mongoose.Schema;

const category = new categorySchema({
    category_ID: { type: Number, required: true, unique: true },
    category_name: { type: String, required: true},
    category_type: { type: String }
});

const Category = mongoose.model('Category', category);
export default Category;