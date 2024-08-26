import dbConnection from "../config/db.js";

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


//         if (!pincode || isNaN(Number(pincode))) {
//             return res.status(400).json({ message: 'Invalid pincode' });
//         }


//         const [result] = await dbConnection.promise().query(
//             `INSERT INTO products (
//                 fullName, mobileNo, email, completeAddress, pincode, state, city, landmark, 
//                 orderId, orderDate, paymentMode, productName, category, quantity, orderValue, 
//                 hsn, physicalWeight, length, breadth, height, courierservices, amount
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 fullName, mobileNo, email, completeAddress, pincode, state, city, landmark,
//                 orderId, orderDate, paymentMode, productName, category, quantity, orderValue,
//                 hsn, physicalWeight, length, breadth, height, courierservices, amount
//             ]
//         );

//         res.status(201).json({
//             message: "Successfully Added Details",
//             data: result
//         });
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

        if (!pincode || isNaN(Number(pincode))) {
            return res.status(400).json({ message: 'Invalid pincode' });
        }

        // Convert orderDate to YYYY-MM-DD format
        const [day, month, year] = orderDate.split('-');
        const formattedDate = `${year}-${month}-${day}`;

        const [result] = await dbConnection.promise().query(
            `INSERT INTO products (
                fullName, mobileNo, email, completeAddress, pincode, state, city, landmark, 
                orderId, orderDate, paymentMode, productName, category, quantity, orderValue, 
                hsn, physicalWeight, length, breadth, height, courierservices, amount
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                fullName, mobileNo, email, completeAddress, pincode, state, city, landmark,
                orderId, formattedDate, paymentMode, productName, category, quantity, orderValue,
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
//     console.log('Product ID:', productId);

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

//         // // Convert ISO 8601 date string to MySQL DATE format (YYYY-MM-DD)
//         // const formattedOrderDate = new Date(orderDate).toISOString().split('T')[0];



//         // Validate and format the orderDate
//         let formattedOrderDate = null;
//         if (orderDate) {
//             const parsedDate = new Date(orderDate);
//             if (!isNaN(parsedDate.getTime())) {
//                 formattedOrderDate = parsedDate.toISOString().split('T')[0];
//             } else {
//                 throw new Error('Invalid orderDate format');
//             }
//         }

        
//         const [result] = await dbConnection.promise().query(
//             `UPDATE products SET 
//                 fullName = ?, mobileNo = ?, email = ?, completeAddress = ?, pincode = ?, state = ?, city = ?, landmark = ?, 
//                 orderId = ?, orderDate = ?, paymentMode = ?, productName = ?, category = ?, quantity = ?, orderValue = ?, 
//                 hsn = ?, physicalWeight = ?, length = ?, breadth = ?, height = ?, courierservices = ?, amount = ?
//             WHERE id = ?`,
//             [
//                 fullName, mobileNo, email, completeAddress, pincode, state, city, landmark,
//                 orderId, formattedOrderDate, paymentMode, productName, category, quantity, orderValue,
//                 hsn, physicalWeight, length, breadth, height, courierservices, amount,
//                 productId
//             ]
//         );

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(200).json({
//             message: "Product details updated successfully",
//             updatedProduct: { id: productId, ...req.body }
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

        // Validate and format the orderDate
        let formattedOrderDate = null;
        if (orderDate) {
            const parsedDate = new Date(orderDate);
            if (!isNaN(parsedDate.getTime())) {
                formattedOrderDate = parsedDate.toISOString().split('T')[0];
            } else {
                throw new Error('Invalid orderDate format');
            }
        }

        let query = `UPDATE products SET `;
        const values = [];

        if (fullName !== undefined) {  
            query += `fullName = ?, `;
            values.push(fullName);
        }
        if (mobileNo !== undefined) {
            query += `mobileNo = ?, `;
            values.push(mobileNo);
        }
        if (email !== undefined) {
            query += `email = ?, `;
            values.push(email);
        }
        if (completeAddress !== undefined) {
            query += `completeAddress = ?, `;
            values.push(completeAddress);
        }
        if (pincode !== undefined) {
            query += `pincode = ?, `;
            values.push(pincode);
        }
        if (state !== undefined) {
            query += `state = ?, `;
            values.push(state);
        }
        if (city !== undefined) {
            query += `city = ?, `;
            values.push(city);
        }
        if (landmark !== undefined) {
            query += `landmark = ?, `;
            values.push(landmark);
        }
        if (orderId !== undefined) {
            query += `orderId = ?, `;
            values.push(orderId);
        }
        if (formattedOrderDate !== null) {
            query += `orderDate = ?, `;
            values.push(formattedOrderDate);
        }
        if (paymentMode !== undefined) {
            query += `paymentMode = ?, `;
            values.push(paymentMode);
        }
        if (productName !== undefined) {
            query += `productName = ?, `;
            values.push(productName);
        }
        if (category !== undefined) {
            query += `category = ?, `;
            values.push(category);
        }
        if (quantity !== undefined) {
            query += `quantity = ?, `;
            values.push(quantity);
        }
        if (orderValue !== undefined) {
            query += `orderValue = ?, `;
            values.push(orderValue);
        }
        if (hsn !== undefined) {
            query += `hsn = ?, `;
            values.push(hsn);
        }
        if (physicalWeight !== undefined) {
            query += `physicalWeight = ?, `;
            values.push(physicalWeight);
        }
        if (length !== undefined) {
            query += `length = ?, `;
            values.push(length);
        }
        if (breadth !== undefined) {
            query += `breadth = ?, `;
            values.push(breadth);
        }
        if (height !== undefined) {
            query += `height = ?, `;
            values.push(height);
        }
        if (courierservices !== undefined) {
            query += `courierservices = ?, `;
            values.push(courierservices);
        }
        if (amount !== undefined) {
            query += `amount = ?, `;
            values.push(amount);
        }

        // Remove the trailing comma and space
        query = query.slice(0, -2);

        query += ` WHERE id = ?`;
        values.push(productId);

        const [result] = await dbConnection.promise().query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product details updated successfully",
            updatedProduct: { id: productId, ...req.body }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update product details', error: error.message });
    }
};





export const deleteAllProduct = async (req, res) => {
    try {
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






// export const deleteProductDetailsById = async (req, res) => {
//     // Extract the array of product IDs from the request body
//     const productId = req.params.id;

//     if (!Array.isArray(productId) || productId.length === 0) {
//         return res.status(400).json({
//             message: 'No product IDs provided for deletion'
//         });
//     }

//     try {
//         // Prepare SQL query to delete products with the given IDs
//         const [result] = await dbConnection.promise().query(
//             'DELETE FROM products WHERE id IN (?)',
//             [productId]
//         );

//         // Check if any rows were affected
//         if (result.affectedRows === 0) {
//             return res.status(404).json({
//                 message: "No products found with the provided IDs"
//             });
//         }

//         res.status(200).json({
//             message: "Products deleted successfully",
//             deletedProductIds: productId
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: 'Failed to delete products'
//         });
//     }
// };
