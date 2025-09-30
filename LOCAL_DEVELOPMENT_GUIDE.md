# Local Development Guide

## Quick Fix for CORS Issues

The CORS errors you're seeing are because:
1. **Local Frontend** (`http://localhost:5173`) is trying to connect to **Production Backend** (`https://waiwebbajkbjds.onrender.com`)
2. The production backend needs to be redeployed with the updated CORS configuration

## Solutions

### Option 1: Use Production Backend (Recommended for now)
The frontend now automatically falls back to the production backend if local backend is not available.

**Steps:**
1. Make sure your frontend is running: `cd frontend && npm run dev`
2. The app will automatically try local backend first, then fallback to production
3. You should see in console: "Local backend not available, trying production backend..."

### Option 2: Run Local Backend (If you want full local development)

**Prerequisites:**
- MongoDB running locally or MongoDB Atlas connection
- Node.js 18+

**Steps:**
1. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Set Environment Variables:**
   Create `backend/.env` file:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Option 3: Deploy Backend with CORS Fix

**Steps:**
1. Deploy the updated `backend/server.js` to Render
2. The backend will then accept requests from `http://localhost:5173`
3. Your local frontend will work with the production backend

## Current Status

✅ **Frontend**: Automatically handles local/production backend switching
✅ **Backend CORS**: Updated to allow localhost:5173 (needs deployment)
✅ **Error Handling**: Graceful fallback when local backend unavailable

## Testing

1. **Start Frontend**: `cd frontend && npm run dev`
2. **Open Browser**: `http://localhost:5173`
3. **Check Console**: Should see "Local backend not available, trying production backend..."
4. **Verify**: Products should load from production backend

## Troubleshooting

**If you still see CORS errors:**
1. Clear browser cache
2. Check if production backend is running: `https://waiwebbajkbjds.onrender.com`
3. Verify the backend has the updated CORS configuration

**If products don't load:**
1. Check browser console for errors
2. Verify internet connection
3. Check if production backend is accessible
