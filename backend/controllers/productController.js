import dbConnection from "../config/db.js";
// import productModel from "../models/productSchema.js"


// export const uploadProductDetails = async (req, res) => {
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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







// export const updateProductDetails = async (req, res) => {
//     const productId = req.params.id;

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


//         const updatedProduct = await productModel.findByIdAndUpdate(productId, {
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
//         }, { new: true });


//         if (!updatedProduct) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(200).json({
//             message: "Product details updated successfully",
//             updatedProduct
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to update product details' });
//     }
// };






export const updateProductDetails = async (req, res) => {
    const productId = req.params.id;
    console.log('Product ID:', productId);

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
            orderDate, // This is in ISO 8601 format
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
 
        // Convert ISO 8601 date string to MySQL DATE format (YYYY-MM-DD)
        const formattedOrderDate = new Date(orderDate).toISOString().split('T')[0];

        // Execute the update query
        const [result] = await dbConnection.promise().query(
            `UPDATE products SET 
                fullName = ?, mobileNo = ?, email = ?, completeAddress = ?, pincode = ?, state = ?, city = ?, landmark = ?, 
                orderId = ?, orderDate = ?, paymentMode = ?, productName = ?, category = ?, quantity = ?, orderValue = ?, 
                hsn = ?, physicalWeight = ?, length = ?, breadth = ?, height = ?, courierservices = ?, amount = ?
            WHERE id = ?`,
            [
                fullName, mobileNo, email, completeAddress, pincode, state, city, landmark,
                orderId, formattedOrderDate, paymentMode, productName, category, quantity, orderValue,
                hsn, physicalWeight, length, breadth, height, courierservices, amount,
                productId
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product details updated successfully",
            updatedProduct: { id: productId, ...req.body }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update product details' });
    }
};






// export const deleteAllProduct = async (req, res) => {
//     try {
//         const deleteProduct = await productModel.deleteMany({});
//         res.status(201).json({
//             message: "All Product Deleted Successfully",
//             deleteAllProduct
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }




export const deleteAllProduct = async (req, res) => {
    try {
        // Assuming `dbConnection` is your MySQL connection object
        const [result] = await dbConnection.promise().query('DELETE FROM products');

        res.status(200).json({
            message: "All products deleted successfully",
            deletedCount: result.affectedRows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
};








// export const deleteProducts = async (req, res) => {
//     const productIds = req.body.productIds;

//     try {
//         if (productIds && productIds.length > 0) {
//             // Convert productIds to ObjectId type if they're not already
//             const objectIds = productIds.map(id => mongoose.Types.ObjectId(id));

//             const result = await productModel.deleteMany({ _id: { $in: objectIds } });

//             res.status(200).json({
//                 message: "Selected products deleted successfully",
//                 deletedCount: result.deletedCount
//             });
//         } else {
//             // Delete all products if no IDs are provided
//             const result = await productModel.deleteMany({});

//             res.status(200).json({
//                 message: "All products deleted successfully",
//                 deletedCount: result.deletedCount
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };







export const deleteProducts = async (req, res) => {
    const productIds = req.body.productIds;

    try {
        if (productIds && productIds.length > 0) {
            const [result] = await dbConnection.promise().query(
                'DELETE FROM products WHERE id IN (?)',
                [productIds]
            );

            res.status(200).json({
                message: "Selected products deleted successfully",
                deletedCount: result.affectedRows
            });
        } else {
            // Delete all products if no IDs are provided
            const [result] = await dbConnection.promise().query('DELETE FROM products');

            res.status(200).json({
                message: "All products deleted successfully",
                deletedCount: result.affectedRows
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
};












// export const deleteProductDetailsById = async (req, res) => {
//     const productId = req.params.id;

//     try {
//         const deleteProductDetailsById = await productModel.findByIdAndDelete(productId);
//         res.status(200).json({
//             message: "Product deleted successfully",
//             deleteProductDetailsById
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to delete product' });
//     }
// }







export const deleteProductDetailsById = async (req, res) => {
    const productId = req.params.id;

    try {
        const [result] = await dbConnection.promise().query(
            'DELETE FROM products WHERE id = ?',
            [productId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            deletedProductId: productId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to delete product'
        });
    }
};