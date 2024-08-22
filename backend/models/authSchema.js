// import mongoose from "mongoose";


// const authSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: {
//         type: String,
//         unique: true,
//         required: true
//     }
// },
// {
//     timestamps: true
// });


// const authModel = mongoose.model("user", authSchema);

// export default authModel;







import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Auth = sequelize.define('Auth', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users', 
    timestamps: true
});

export default Auth;
