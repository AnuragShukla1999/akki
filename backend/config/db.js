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
// import mysql from 'mysql2/promise';

// const dbConnection = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "anurag7587709264@#$%shukla",
//     database: "ecom",
//     port: "3306"
// });

// export default dbConnection;




// import mysql from 'mysql2/promise';

// const dbConfig = {
//     host: "127.0.0.1",
//     user: "root",
//     password: "anurag7587709264@#$%shukla",
//     database: "ecom",
//     port: "3306"
// };

// let connection;

// async function connect() {
//     if (!connection) {
//         connection = await mysql.createConnection(dbConfig);
//     }
//     return connection;
// }

// async function createDatabase() {
//     const conn = await connect();
//     await conn.query("CREATE DATABASE IF NOT EXISTS ecom");
//     console.log("Database created or already exists");
// }

// export default { connect, createDatabase };




import mysql from "mysql2";

 const dbConnection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "anurag7587709264@#$%shukla",
    database: "office",
    port: "3306"
});


dbConnection.connect((err) => {
    if (err) {
      console.error('error connecting to the database:', err.stack);
      return;
    }
    console.log('connected to the database as id ' + dbConnection.threadId);
  });

export default dbConnection;


// Handle connection errors
// dbConnection.on('error', (err) => {
//     console.error('MySQL Pool Error:', err);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       handleDisconnect();
//     } else {
//       throw err;
//     }
//   });
  
//   function handleDisconnect() {
//     dbConnection.end(err => {
//       if (err) {
//         console.error('Error ending MySQL pool:', err);
//       }
//       console.log('Reconnecting to MySQL...');
//       // Recreate the pool
//       pool = mysql.createPool(dbConfig);
//     });
//   };



