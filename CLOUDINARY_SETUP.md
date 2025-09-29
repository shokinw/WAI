# Cloudinary Setup Guide for WAI-WEB E-commerce

## Overview
Cloudinary is used for professional image management in your e-commerce website. It handles image uploads, optimization, and delivery.

## Setup Steps

### 1. Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your Credentials
1. Log into your Cloudinary dashboard
2. Go to the "Dashboard" section
3. Copy the following values:
   - **Cloud Name**: Found in the "Account Details" section
   - **API Key**: Found in the "Account Details" section  
   - **API Secret**: Found in the "Account Details" section

### 3. Configure Environment Variables

#### For Local Development
Create a `.env` file in the `backend` directory:
```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### For Production (Render)
1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add these environment variables:
   - `CLOUDINARY_CLOUD_NAME` = your_cloudinary_cloud_name
   - `CLOUDINARY_API_KEY` = your_cloudinary_api_key
   - `CLOUDINARY_API_SECRET` = your_cloudinary_api_secret

### 4. Features Included

#### Image Optimization
- **Auto Quality**: Automatically optimizes image quality
- **Auto Format**: Serves WebP/AVIF when supported
- **Responsive Images**: Automatically resizes for different devices
- **Folder Organization**: Images stored in `wai-web/products/` folder

#### Image Transformations
- **Max Size**: 800x800 pixels (maintains aspect ratio)
- **Quality**: Auto-optimized for web delivery
- **Format**: Auto-converted to best format for browser

#### Error Handling
- **Connection Test**: Verifies Cloudinary connection on startup
- **Upload Validation**: Checks if images uploaded successfully
- **Fallback Messages**: User-friendly error messages

### 5. Testing

#### Test Image Upload
1. Start your backend server
2. Use the admin panel to add a product
3. Upload images through the product form
4. Check if images appear in your Cloudinary dashboard

#### Verify Configuration
Look for these messages in your server logs:
```
✅ Cloudinary configured successfully and connected
```

If you see warnings:
```
⚠️ Cloudinary credentials not found. Image uploads will be disabled.
```
Then your environment variables are not set correctly.

### 6. Troubleshooting

#### Common Issues

1. **"Image upload service not configured"**
   - Check if all three environment variables are set
   - Verify the credentials are correct

2. **"Cloudinary connection test failed"**
   - Check your internet connection
   - Verify API credentials are correct
   - Check if your Cloudinary account is active

3. **Images not uploading**
   - Check file size (max 5MB per image)
   - Check file format (only images allowed)
   - Check Cloudinary account limits

#### Debug Steps
1. Check server logs for Cloudinary messages
2. Verify environment variables are loaded
3. Test Cloudinary credentials in their dashboard
4. Check network connectivity

### 7. Production Considerations

#### Security
- Never commit `.env` files to version control
- Use Render's environment variable system for production
- Regularly rotate API keys

#### Performance
- Images are automatically optimized for web delivery
- CDN delivery ensures fast loading worldwide
- Responsive images reduce bandwidth usage

#### Monitoring
- Monitor your Cloudinary usage in their dashboard
- Set up alerts for storage/bandwidth limits
- Track image upload success rates

## Support

If you need help:
1. Check Cloudinary documentation: [cloudinary.com/documentation](https://cloudinary.com/documentation)
2. Check server logs for specific error messages
3. Verify all environment variables are set correctly
