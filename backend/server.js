import express  from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './router/authRouter.js';

import categoryRoute from './router/categoryRoute.js';
import productRoute from './router/productRoute.js'
import cors from 'cors'

//config env file
dotenv.config();

// database
connectDB();
// rest object
const app = express()

//middelware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//routes middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);



// rest api
app.get('/',(req, res)=> {
  res.send('Hello World')
})

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`express server is runhning ${PORT}`)
})
