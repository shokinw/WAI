// controllers/orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";



// ----------------- COD -----------------
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ----------------- Razorpay -----------------
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_live_RL2wqTlyLM6QB9",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "MhmBQns28uxXS2T3ZjjaCPwY",
});

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const options = {
      amount: Math.round(Number(amount) * 100), // in paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    // Create pending order in DB
    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
      status: "Pending",
      razorpayOrderId: order.id,
    });
    await newOrder.save();

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "jvknergjknrjkbvngf")
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Payment verification failed" });
    }

    // Mark order as paid by mapping stored order id
    const paidOrder = await orderModel.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { payment: true, status: "Paid", razorpayPaymentId: razorpay_payment_id }
    );

    if (!paidOrder) {
      return res.json({ success: false, message: "Order not found for verification" });
    }

    await userModel.findByIdAndUpdate(paidOrder.userId, { cartData: {} });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ----------------- Admin & User -----------------
const allOrders = async (req, res) => {
  try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
};

const userOrders = async (req, res) => {
   try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
};

const updateStatus = async (req, res) => {
   try {
        
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
};

export {
  verifyRazorpay,
  placeOrder,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
