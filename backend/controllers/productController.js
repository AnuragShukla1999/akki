import dbConnection from "../config/db.js";
import productModel from "../models/productSchema.js"


// export const UploadProductDetails = async (req, res) => {
//     try {
//         const {
//             fullName,
//             mobileNo,
//             email,
//             completeAddress,
//             pincode,
//             state,
//             city,
//             landmark,
//             orderId,
//             orderDate,
//             paymentMode,
//             productName,
//             category,
//             quantity,
//             orderValue,
//             hsn,
//             physicalWeight,
//             length,
//             breadth,
//             height,
//             courierservices,
//             amount
//         } = req.body;

//         const newProduct = new productModel({
//             fullName,
//             mobileNo,
//             email,
//             completeAddress,
//             pincode,
//             state,
//             city,
//             landmark,
//             orderId,
//             orderDate,
//             paymentMode,
//             productName,
//             category,
//             quantity,
//             orderValue,
//             hsn,
//             physicalWeight,
//             length,
//             breadth,
//             height,
//             courierservices,
//             amount
//         });

//         const savedProduct = await newProduct.save();
//         console.log(savedProduct)
//         res.status(201).json({
//             message: "Successfully Added Details"
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to create product' });
//     }
// };






export const uploadProductDetails = async (req, res) => {
    try {
        const {
            fullName,
            mobileNo,
            email,
            completeAddress,
            pincode,
            state,
            city,
            landmark,
            orderId,
            orderDate,
            paymentMode,
            productName,
            category,
            quantity,
            orderValue,
            hsn,
            physicalWeight,
            length,
            breadth,
            height,
            courierservices,
            amount
        } = req.body;

        const [result] = await dbConnection.promise().query(
            `INSERT INTO products (
                fullName, mobileNo, email, completeAddress, pincode, state, city, landmark, 
                orderId, orderDate, paymentMode, productName, category, quantity, orderValue, 
                hsn, physicalWeight, length, breadth, height, courierservices, amount
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                fullName, mobileNo, email, completeAddress, pincode, state, city, landmark,
                orderId, orderDate, paymentMode, productName, category, quantity, orderValue,
                hsn, physicalWeight, length, breadth, height, courierservices, amount
            ]
        );

        res.status(201).json({
            message: "Successfully Added Details",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create product' });
    }
};







export const updateProductDetails = async (req, res) => {
    const productId = req.params.id;

    try {
        const {
            fullName,
            mobileNo,
            email,
            completeAddress,
            pincode,
            state,
            city,
            landmark,
            orderId,
            orderDate,
            paymentMode,
            productName,
            category,
            quantity,
            orderValue,
            hsn,
            physicalWeight,
            length,
            breadth,
            height,
            courierservices,
            amount
        } = req.body;


        const updatedProduct = await productModel.findByIdAndUpdate(productId, {
            fullName,
            mobileNo,
            email,
            completeAddress,
            pincode,
            state,
            city,
            landmark,
            orderId,
            orderDate,
            paymentMode,
            productName,
            category,
            quantity,
            orderValue,
            hsn,
            physicalWeight,
            length,
            breadth,
            height,
            courierservices,
            amount
        }, { new: true });


        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product details updated successfully",
            updatedProduct
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update product details' });
    }
};





export const deleteAllProduct = async (req, res) => {
    try {
        const deleteProduct = await productModel.deleteMany({});
        res.status(201).json({
            message: "All Product Deleted Successfully",
            deleteAllProduct
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}





export const deleteProductDetailsById = async (req, res) => {
    const productId = req.params.id;

    try {
        const deleteProductDetailsById = await productModel.findByIdAndDelete(productId);
        res.status(200).json({
            message: "Product deleted successfully",
            deleteProductDetailsById
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
}