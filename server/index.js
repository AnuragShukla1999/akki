import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from './routes/authRoute.js';
import locationRouter from './routes/locationRoute.js';
import ProductRouter from './routes/productRoute.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Hello World!')
})

// api
app.use('/api', authRouter);
app.use('/api', ProductRouter);
app.use('/api', locationRouter);



app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});