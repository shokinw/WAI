# WAI-WEB Deployment Guide

## Overview
This project consists of three main components:
- **Backend**: Node.js/Express API server
- **Frontend**: React application for customers
- **Admin**: React application for admin panel

## Render Deployment

### Prerequisites
1. Render account
2. MongoDB Atlas database
3. Cloudinary account for image storage
4. Razorpay account for payments

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_secure_admin_password
PORT=4000
NODE_ENV=production
```

**Important**: Cloudinary is required for image uploads. Get your credentials from [cloudinary.com](https://cloudinary.com) dashboard.

#### Frontend (.env)
```env
VITE_BACKEND_URL=https://wai-qnl1.onrender.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

#### Admin (.env)
```env
VITE_BACKEND_URL=https://wai-qnl1.onrender.com
```

### Deployment Steps

1. **Deploy Backend First**
   - Create a new Web Service on Render
   - Connect your GitHub repository
   - Set root directory to `backend`
   - Use Node.js environment
   - Set build command: `npm ci --only=production`
   - Set start command: `npm start`
   - Add all environment variables

2. **Deploy Frontend**
   - Create a new Static Site on Render
   - Connect your GitHub repository
   - Set root directory to `frontend`
   - Set build command: `npm ci && npm run build`
   - Set publish directory to `dist`
   - Add environment variables

3. **Deploy Admin**
   - Create a new Static Site on Render
   - Connect your GitHub repository
   - Set root directory to `admin`
   - Set build command: `npm ci && npm run build`
   - Set publish directory to `dist`
   - Add environment variables

### Important Notes

- Backend URL will be: `https://wai-qnl1.onrender.com`
- Frontend URL will be: `https://waiwebb-frontend.onrender.com`
- Admin URL will be: `https://waiwebb-admin.onrender.com`
- Update CORS origins in backend if using different URLs

### Troubleshooting

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Check environment variables

2. **CORS Issues**
   - Update CORS origins in backend/server.js
   - Ensure frontend/admin URLs are correct

3. **Database Connection**
   - Verify MongoDB URI is correct
   - Check network access in MongoDB Atlas
   - Check health endpoint: `https://your-backend-url.onrender.com/health`

4. **Image Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits (max 5MB per file)
   - Check file count limits (max 4 files)

5. **Admin Login Issues**
   - Verify ADMIN_EMAIL and ADMIN_PASSWORD are set
   - Check JWT_SECRET is configured

6. **Server Crashes**
   - Check logs for uncaught exceptions
   - Verify all environment variables are set
   - Check database connectivity

### Local Development

1. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ../admin && npm install
   ```

2. Start development servers:
   ```bash
   # Backend
   cd backend && npm run server
   
   # Frontend
   cd frontend && npm run dev
   
   # Admin
   cd admin && npm run dev
   ```

### File Structure
```
WAI-WEB/
├── backend/          # Node.js API server
├── frontend/         # React customer app
├── admin/           # React admin app
└── render.yaml      # Render deployment config
```
