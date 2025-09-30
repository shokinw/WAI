import mongoose from 'mongoose';
import userModel from './models/userModel.js';

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://akhil:akhil123@cluster0.8jqjq.mongodb.net/waiweb?retryWrites=true&w=majority');
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

const checkUsers = async () => {
    await connectDB();
    
    try {
        const users = await userModel.find({}, 'name email createdAt');
        console.log('\n📊 Users in database:');
        console.log('Total users:', users.length);
        
        if (users.length === 0) {
            console.log('❌ No users found in database');
            console.log('💡 You need to register first before logging in');
        } else {
            users.forEach((user, index) => {
                console.log(`${index + 1}. Name: ${user.name}, Email: ${user.email}, Created: ${user.createdAt}`);
            });
        }
    } catch (error) {
        console.error('❌ Error fetching users:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

checkUsers();
