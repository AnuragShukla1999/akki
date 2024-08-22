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








// import mysql from "mysql2";

//  const dbConnection = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "anurag7587709264@#$%shukla",
//     database: "office",
//     port: "3306"
// });


// dbConnection.connect((err) => {
//     if (err) {
//       console.error('error connecting to the database:', err.stack);
//       return;
//     }
//     console.log('connected to the database as id ' + dbConnection.threadId);
//   });

// export default dbConnection;






import { Sequelize } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize('demo', 'root', 'anurag7587709264@#$%shukla', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  logging: false
});

// Test the connection
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Export the sequelize instance
export default sequelize;