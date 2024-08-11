import express from 'express'
import { addFood } from '../controllers/foodController.js'
import multer from "multer"

const foodRouter = express.Router();

foodRouter.post("/add", addFood);

// Image Storage Engine

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()} ${file.originalname}`)

    }
})

const upload = multer({ Storage: Storage });

foodRouter.post("/add", upload.single("image"), addFood)

export default foodRouter;
