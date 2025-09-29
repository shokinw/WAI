import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productController.js'
import { updateLatest } from '../controllers/productUpdateLatest.js'
import { updateProduct } from '../controllers/productUpdate.js'
import { upload, handleMulterError } from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Product routes with proper error handling
productRouter.post('/add', adminAuth, upload.fields([
    {name:'image1',maxCount:1},
    {name:'image2',maxCount:1},
    {name:'image3',maxCount:1},
    {name:'image4',maxCount:1}
]), handleMulterError, addProduct);

productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);
productRouter.post('/update-latest', adminAuth, updateLatest);

productRouter.post('/update', adminAuth, upload.fields([
    {name:'image1',maxCount:1},
    {name:'image2',maxCount:1},
    {name:'image3',maxCount:1},
    {name:'image4',maxCount:1}
]), handleMulterError, updateProduct);

export default productRouter;