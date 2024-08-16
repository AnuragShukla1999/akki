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
})