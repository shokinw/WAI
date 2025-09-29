// backend/routes/orderRoute.js
import express from "express";
import {
  placeOrder,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyRazorpay,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// ✅ Admin Features
orderRouter.post("/list", adminAuth, allOrders);          // Get all orders (Admin)
orderRouter.post("/status", adminAuth, updateStatus);     // Update order status (Admin)

// ✅ Payment / Order Placement
orderRouter.post("/place", authUser, placeOrder);            // COD
orderRouter.post("/razorpay", authUser, placeOrderRazorpay); // Razorpay

// ✅ User Orders
orderRouter.post("/userorders", authUser, userOrders); // User’s orders

// ✅ Verify Payments
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

export default orderRouter;
