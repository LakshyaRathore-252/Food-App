import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';

// App Config
const app = express();
const PORT = 4000;


// Middlewares
app.use(express.json());
app.use(cors());


// API Endpoints
app.use("/api/food", foodRouter)

// DB connection
connectDB();


app.get('/', (req, res) => {
    res.send("API WORKING")
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})