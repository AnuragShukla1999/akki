import dbConnection from "../config/db.js";
// import productModel from "../models/productSchema.js"


// export const getProductDetails = async (req, res) => {
//     try {
//         const allDetails = await productModel.find().sort({ createdAt : -1 });


//         res.json({
//             message: "All Product Detail got",
//             success: true,
//             data: allDetails
//         })
//     } catch (error) {
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// };






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





// export const getProductDetailsById = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const singleProductDetail = await productModel.findById(id);

//         if (!singleProductDetail) {
//             return res.status(401).json({
//                 message: "Product not found (id wise)"
//             })
//         }

//         res.status(201).json({
//             message: singleProductDetail,
//             success: true
//         })
//     } catch (error) {

//         return res.status(500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }