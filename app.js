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
	const isDevelopment = req.app.get('env') === 'development';
    res.locals.message = error.message;
    res.locals.error = isDevelopment ? error : {};

    console.error(error); 
    const status = error.status || 500;
    res.status(status);

    const errorInfo = isDevelopment ? { message: error.message, status } : {};
    return res.send('internal server error')
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});