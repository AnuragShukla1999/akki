import dbConnection from "../config/db.js";

export const getProductDetails = async (req, res) => {
    try {
        // Fetch product details directly from the connection
        const [rows] = await dbConnection.promise().query(
            `SELECT * FROM products ORDER BY createdAt DESC`
        );

        res.json({
            message: "All Product Details fetched",
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};