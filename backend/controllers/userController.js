import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email format" 
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "User doesn't exist" 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

// User Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Name, email, and password are required" 
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email format" 
            });
        }

        if (password.length < 8) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 8 characters long" 
            });
        }

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(409).json({ 
                success: false, 
                message: "User already exists" 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.status(201).json({ success: true, token });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

// Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            });
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            console.error("Admin credentials not configured");
            return res.status(500).json({ 
                success: false, 
                message: "Admin authentication not configured" 
            });
        }

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign(
                { admin: email, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.json({ success: true, token });
        } else {
            res.status(401).json({ 
                success: false, 
                message: "Invalid admin credentials" 
            });
        }

    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};

export { loginUser, registerUser, adminLogin };
