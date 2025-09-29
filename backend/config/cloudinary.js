import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
    try {
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!cloudName || !apiKey || !apiSecret) {
            console.warn("⚠️ Cloudinary credentials not found. Image uploads will be disabled.");
            console.warn("⚠️ Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.");
            return false;
        }

        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
            secure: true
        });

        // Test the configuration
        try {
            await cloudinary.api.ping();
            console.log("✅ Cloudinary configured successfully and connected");
            return true;
        } catch (testError) {
            console.error("❌ Cloudinary connection test failed:", testError.message);
            return false;
        }
    } catch (error) {
        console.error("❌ Cloudinary configuration failed:", error.message);
        return false;
    }
};

export default connectCloudinary;