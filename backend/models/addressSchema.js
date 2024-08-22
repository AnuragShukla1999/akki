import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const Address = sequelize.define('Address', {
    locationName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'addresses',
    timestamps: true
});

export default Address;