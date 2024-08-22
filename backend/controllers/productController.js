import Product from "../models/productSchema.js";

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

        const newProduct = await Product.create({
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
        });

        res.status(201).json({
            message: "Successfully Added Details",
            data: newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create product' });
    }
};





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



         // Validate input data
         if (isNaN(quantity) || isNaN(orderValue) || isNaN(amount)) {
            return res.status(400).json({ message: 'Quantity, orderValue, and amount must be numbers' });
        }

        // Convert ISO 8601 date string to MySQL DATE format (YYYY-MM-DD)
        const formattedOrderDate = new Date(orderDate).toISOString().split('T')[0];

        const [updated] = await Product.update({
            fullName,
            mobileNo,
            email,
            completeAddress,
            pincode,
            state,
            city,
            landmark,
            orderId,
            orderDate: formattedOrderDate,
            paymentMode,
            productName,
            category,
            quantity: parseInt(quantity, 10),
            orderValue: parseFloat(orderValue),
            hsn,
            physicalWeight,
            length,
            breadth,
            height,
            courierservices,
            amount: parseFloat(amount)
        }, {
            where: { id: productId }
        });

        if (updated === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await Product.findByPk(productId);

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
        const result = await Product.destroy({ where: {} });

        res.status(200).json({
            message: "All products deleted successfully",
            deletedCount: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};





export const deleteProducts = async (req, res) => {
    const productIds = req.body.productIds;

    try {
        if (productIds && productIds.length > 0) {
            const result = await Product.destroy({
                where: {
                    id: productIds
                }
            });

            res.status(200).json({
                message: "Selected products deleted successfully",
                deletedCount: result
            });
        } else {
            // Delete all products if no IDs are provided
            const result = await Product.destroy({ where: {} });

            res.status(200).json({
                message: "All products deleted successfully",
                deletedCount: result
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};





export const deleteProductDetailsById = async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await Product.destroy({
            where: { id: productId }
        });

        if (result === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            deletedProductId: productId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};