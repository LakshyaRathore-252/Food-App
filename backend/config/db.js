import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rathorelakshya252:IOAamssytOKlcb7n@cluster0.aujy7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/food-app').then(() => console.log("DB COnnected"))
}