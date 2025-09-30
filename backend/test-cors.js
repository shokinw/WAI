// Simple CORS test script
import axios from 'axios';

const testCORS = async () => {
    try {
        console.log('Testing CORS for backend...');
        const response = await axios.get('https://waiwebbajkbjds.onrender.com/api/product/list', {
            headers: {
                'Origin': 'https://wai-4.onrender.com'
            }
        });
        console.log('✅ CORS test successful:', response.status);
    } catch (error) {
        console.log('❌ CORS test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        }
    }
};

testCORS();
