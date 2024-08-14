import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dbConnection from "./config/db.js";

import authRouter from './routes/authRoute.js';
import userRouter from "./routes/userRoute.js";
import locationRouter from './routes/locationRoute.js';
import ProductRouter from './routes/productRoute.js'

dotenv.config();

dbConnection();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// app.use(cors({
//     origin: 'http://localhost:3000', 
//     credentials: true, 
// }));


// Define allowed origins
// const allowedOrigins = ['https://officeproject-1.onrender.com'];

// // Apply CORS middleware
// app.use(cors({
//   origin: function(origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true
// }));


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


app.listen(process.env.PORT, () => {
    console.log(`server is connnected at ${process.env.PORT}`);
})