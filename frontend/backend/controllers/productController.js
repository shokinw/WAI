import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller, categories, subCategories, latest, discountPercent } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Handle uploaded images safely
    const images = [];
    ["image1", "image2", "image3", "image4"].forEach(field => {
      if (req.files?.[field]?.[0]) images.push(req.files[field][0]);
    });

    let imagesUrl = [];
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (file) => {
          try {
            const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
            return result.secure_url;
          } catch (err) {
            console.error("Cloudinary upload error:", err);
            return null; // skip failed uploads
          }
        })
      );
      imagesUrl = imagesUrl.filter(Boolean); // remove nulls
    }

    // Safe parsing of sizes and multi-selects
    const safeParse = (val, fallback) => {
      if (val === undefined || val === null || val === '') return fallback;
      if (Array.isArray(val)) return val;
      try { return JSON.parse(val); } catch { return fallback; }
    };

    const parsedSizes = safeParse(sizes, []);
    const parsedCategories = safeParse(categories, []);
    const parsedSubCategories = safeParse(subCategories, []);

    const productData = {
      name,
      description,
      category, // legacy single
      price: Number(price),
      subCategory: subCategory || "", // legacy single
      categories: parsedCategories,
      subCategories: parsedSubCategories,
      bestseller: bestseller === "true",
      latest: latest === "true",
      discountPercent: Number(discountPercent) || 0,
      sizes: parsedSizes,
      images: imagesUrl,
      date: new Date(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added", product });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to add product" });
  }
};

// List products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ date: -1 });
    res.json({ success: true, products });
  } catch (error) {
    console.error("List products error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch products" });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "Product ID is required" });

    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Remove product error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to remove product" });
  }
};

// Single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "Product ID is required" });

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (error) {
    console.error("Single product error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch product" });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
