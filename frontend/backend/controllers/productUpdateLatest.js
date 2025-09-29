import productModel from "../models/productModel.js";

export const updateLatest = async (req, res) => {
  try {
    const { id, latest } = req.body;
    if (!id) return res.json({ success: false, message: "Product ID is required" });
    await productModel.findByIdAndUpdate(id, { latest: !!latest });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


