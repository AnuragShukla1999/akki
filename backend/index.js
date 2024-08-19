import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRouter from './routes/authRoute.js';
import userRouter from "./routes/userRoute.js";
import locationRouter from './routes/locationRoute.js';
import ProductRouter from './routes/productRoute.js';
import dbConnection from "./config/db.js";

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://192.168.29.93:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
  };
  
  app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});



app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


// app.use(express.static('frontend/build'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// api
app.use('/api', authRouter);
app.use('/api', ProductRouter);
app.use('/api', userRouter);
app.use('/api', locationRouter);


app.listen(process.env.PORT,  () => {
    console.log(`server is connnected at ${process.env.PORT}`);
});


dbConnection();



// dbConnection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL database:', err);
//         return; // Exit early to avoid further issues
//     }
//     console.log('Connected to MySQL database');
//     // Create database if it does not exist
//     dbConnection.query("CREATE DATABASE IF NOT EXISTS office", (err, result) => {
//         if (err) {
//             console.error('Error creating database:', err);
//             return; // Exit early to avoid further issues 
//         }
//         console.log("Database created or already exists");
//     });
// })


// console.log("Database", dbConnection);