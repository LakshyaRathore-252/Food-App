import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import cartRouter from './routes/cartRoutes.js';
import foodRouter from './routes/foodRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import userRouter from './routes/userRoutes.js';

// App Config
const app = express();
const PORT = 4000 || process.env.PORT;


// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// DB connection
connectDB();


app.get('/', (req, res) => {
    res.send("API WORKING")
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})