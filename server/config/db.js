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
      console.error('Error connecting to the Database:', err.stack);
      return;
    }
    console.log('Connected to the Database');
  });

export default dbConnection;