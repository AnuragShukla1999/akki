// import mongoose from "mongoose";

// const addressSchema = new mongoose.Schema({
//     locationName: {
//         type: String,
//         required: true
//     },
// });

// const locationSchema = new mongoose.Schema({
//     pincode: {
//         type: Number,
//         required: true
//     },
//     addresses: {
//         type: [addressSchema],
//         required: true
//     },
//     city: {
//         type: String,
//         required: true
//     },
//     state: {
//         type: String,
//         required: true
//     }
// }, { timestamps: true });

// const locationModal = mongoose.model('locations', locationSchema);

// export default locationModal;











import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Address from './addressSchema.js';

const Location = sequelize.define('Location', {
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'locations',
    timestamps: true
});

// Define association
Location.hasMany(Address, {
    foreignKey: 'locationId',
    as: 'addresses' // Alias for the association
});
Address.belongsTo(Location, {
    foreignKey: 'locationId',
    as: 'location'
});

export default Location;
