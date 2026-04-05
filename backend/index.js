import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './utils/db.js';
import cors from 'cors';
import authRouter from './Routes/auth.route.js';
import urlRouter from './Routes/url.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors(
    {
    origin: 'http://localhost:5173',
    credentials: true,
}
));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/api/auth', authRouter);
app.use('/api/url', urlRouter);


connectDb().then(()=>{
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
}).catch((err)=>{
    console.error(`Error connecting to database: ${err.message}`);
})