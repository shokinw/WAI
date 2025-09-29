import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
    try {
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
            console.warn("⚠️ Cloudinary credentials not found. Image uploads will be disabled.");
            return;
        }

        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret
        });

        console.log("✅ Cloudinary configured successfully");
    } catch (error) {
        console.error("❌ Cloudinary configuration failed:", error.message);
    }
};

export default connectCloudinary;