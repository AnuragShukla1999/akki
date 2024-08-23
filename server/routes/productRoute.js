import express from 'express';
import { uploadProductDetails, updateProductDetails, deleteProducts, deleteAllProduct, deleteProductDetailsById } from '../controllers/productController.js';
import { getProductDetails } from '../controllers/getProductDetails.js'

const router = express.Router();

router.post('/productorderdetails', uploadProductDetails);
router.get('/getproductdetails', getProductDetails);
router.put('/updateproductdetails/:id', updateProductDetails);
router.delete('/deleteproductdetails/:id', deleteProductDetailsById);

router.delete('/deleteallproduct', deleteAllProduct);
router.delete('/deleteproduct', deleteProducts);

export default router;