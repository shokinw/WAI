import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

export const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      subCategory,
      categories,
      subCategories,
      sizes,
      latest,
      discountPercent,
    } = req.body;

    if (!id) return res.json({ success: false, message: "Product ID is required" });

    const product = await productModel.findById(id);
    if (!product) return res.json({ success: false, message: "Product not found" });

    const safeParse = (val, fallback) => {
      if (val === undefined || val === null || val === "") return fallback;
      if (Array.isArray(val)) return val;
      try { return JSON.parse(val); } catch { return fallback; }
    };

    // Handle new images if provided
    const files = [];
    ["image1", "image2", "image3", "image4"].forEach((field) => {
      if (req.files?.[field]?.[0]) files.push(req.files[field][0]);
    });

    let imagesUrl = product.images || [];
    if (files.length > 0) {
      const uploaded = await Promise.all(
        files.map(async (f) => {
          try {
            const result = await cloudinary.uploader.upload(f.path, { resource_type: "image" });
            return result.secure_url;
          } catch (err) {
            return null;
          }
        })
      );
      imagesUrl = uploaded.filter(Boolean);
    }

    const update = {
      ...(name !== undefined ? { name } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(price !== undefined ? { price: Number(price) } : {}),
      ...(category !== undefined ? { category } : {}),
      ...(subCategory !== undefined ? { subCategory } : {}),
      ...(categories !== undefined ? { categories: safeParse(categories, []) } : {}),
      ...(subCategories !== undefined ? { subCategories: safeParse(subCategories, []) } : {}),
      ...(sizes !== undefined ? { sizes: safeParse(sizes, []) } : {}),
      ...(latest !== undefined ? { latest: latest === "true" || latest === true } : {}),
      ...(discountPercent !== undefined ? { discountPercent: Number(discountPercent) || 0 } : {}),
      ...(files.length > 0 ? { images: imagesUrl } : {}),
    };

    await productModel.findByIdAndUpdate(id, update);
    res.json({ success: true, message: "Product updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


