// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     fullName: {
//         type: String,
//         required: true
//     },
//     mobileNo: {
//         type: Number,
//         required: true
//     },
//     email: {
//         type: String
//     },



//     completeAddress: {
//         type: String,
//         required: true
//     },
//     pincode: {
//         type: Number,
//         required: true
//     },
//     state: {
//         type: String
//     },
//     city: {
//         type: String
//     },
//     landmark: {
//         type: String
//     },




//     orderId: {
//         type: String,
//         required: true
//     },
//     orderDate: {
//         type: Date,
//         required: true
//     },
//     paymentMode: {
//         type: String,
//         enum: ['cod', 'prepaid'],
//         required: true
//     },


//     productName: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         enum: ['accessories', 'fashion and clothing', 'accessories', 'electronics', 'fmcg', 'footwear', 'toys', 'sports equipment', 'others', 'wellness', 'medicines']
//     },
//     quantity: {
//         type: Number,
//         required: true
//     },
//     orderValue: {
//         type: Number,
//         required: true
//     },
//     hsn: {
//         type: String,
//         required: true
//     },





//     physicalWeight: {
//         type: String,
//         required: true
//     },
//     length: {
//         type: String,
//         required: true
//     },
//     breadth: {
//         type: String,
//         required: true
//     },
//     height: {
//         type: String,
//         required: true
//     },


//     courierservices: {
//         type: String,
//         enum: ['xpressbees', 'dtdc', 'delhivery', 'indiaPost', 'bluedart']
//     },

//     amount: {
//         type: Number,
//         required: true
//     },
// }, 
// {
//     timestamps: true
// });


// const productModel = mongoose.model("productDetails", productSchema);

// export default productModel;




























import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobileNo: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    completeAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    landmark: {
        type: DataTypes.STRING,
        allowNull: true
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    paymentMode: {
        type: DataTypes.ENUM('cod', 'prepaid'),
        allowNull: false
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM(
            'accessories', 'fashion and clothing', 'electronics', 'fmcg', 'footwear', 
            'toys', 'sports equipment', 'others', 'wellness', 'medicines'
        ),
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderValue: {
        type: DataTypes.FLOAT, 
        allowNull: false
    },
    hsn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    physicalWeight: {
        type: DataTypes.STRING,
        allowNull: false
    },
    length: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breadth: {
        type: DataTypes.STRING,
        allowNull: false
    },
    height: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courierservices: {
        type: DataTypes.ENUM('xpressbees', 'dtdc', 'delhivery', 'indiaPost', 'bluedart'),
        allowNull: true
    },
    amount: {
        type: DataTypes.FLOAT, // Use FLOAT or DECIMAL for currency values
        allowNull: false
    }
}, {
    tableName: 'productDetails',
    timestamps: true
});

export default Product;
