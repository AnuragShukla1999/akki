import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from './routes/authRoute.js';
import locationRouter from './routes/locationRoute.js';
import ProductRouter from './routes/productRoute.js';
import sequelize from "./config/db.js";

dotenv.config();

const app = express();



import { internalIpV6, internalIpV4 } from 'internal-ip';

console.log(await internalIpV6());

console.log(await internalIpV4());



// const allowedOrigins = ['http://192.168.29.93:3000', 'http://localhost:3000']; 

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type,Authorization',
//     credentials: true
// };

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


// app.use(cors({
//     origin: '*'
// }));

// app.use(cors(corsOptions));

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



const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        await sequelize.sync({ alter: true });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running at http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Error syncing database or starting server:', error);
    }
};


startServer();