import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Connection event handlers
        mongoose.connection.on('connected', () => {
            console.log("✅ MongoDB Connected Successfully");
        });

        mongoose.connection.on('error', (err) => {
            console.error("❌ MongoDB Connection Error:", err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log("⚠️ MongoDB Disconnected");
        });

        // Connect to MongoDB
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }

        await mongoose.connect(`${mongoURI}/WAIWEB`);

        console.log("🔗 Connected to MongoDB Atlas");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // Exit process if DB connection fails
    }
};

export default connectDB;