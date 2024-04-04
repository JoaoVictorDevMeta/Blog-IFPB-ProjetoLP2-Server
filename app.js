import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//importação
import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
//rotas
app.use('/profile', userRoute);
app.use('/auth', authRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use( ( error, req, res, next ) => {
	const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});