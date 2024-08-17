// import mongoose from "mongoose";


// const dbConnection = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB);
//         console.log ("Database is connected")
//     } catch (error) {
//         console.error("Error", error)
//     }
// }

// export default dbConnection;



// db.js
import mysql from 'mysql2';

const dbConnection = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "anurag7587709264@#$%shukla",
    database: "ecom",
    port: "3306"
});

export default dbConnection;
