import Product from "../models/productSchema.js";

export const getProductDetails = async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.json({
            message: "All Product Details fetched",
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(400).json({
            message: error.message || 'An error occurred',
            error: true,
            success: false
        });
    }
};