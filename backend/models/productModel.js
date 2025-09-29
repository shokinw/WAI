import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: false }, // legacy single
  subCategory: { type: String, required: false, default: "" }, // legacy single
  categories: { type: [String], default: [] },
  subCategories: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  bestseller: { type: Boolean, default: false }, // legacy flag
  latest: { type: Boolean, default: false },
  discountPercent: { type: Number, default: 0 },
  images: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
