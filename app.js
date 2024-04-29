import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//middlewares
import { verifyToken } from "./src/middleware/tokenValidation.js";
import { checkUserlogged } from "./src/utils/checkUser.js";
//importação
import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import searchRoute from './src/routes/search.route.js';
import profileRoute from './src/routes/profile.route.js';
//rotas
app.use('/api/user/:id', verifyToken, checkUserlogged, userRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/search', searchRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use( ( error, req, res, next ) => {
	const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});