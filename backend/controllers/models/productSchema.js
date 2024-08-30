import { DataTypes } from 'sequelize';
import sequelize from '../../../server/config/db.js';

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
