import fs from 'fs';
import foodModel from '../models/foodModels.js';

// Add food Item.
const addFood = async (req, res) => {
    console.log(req.file.filename);
    let image_filename = req.file.filename;  // No need to use template literal here

    const food = new foodModel({  // Ensure the model name is correctly capitalized
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    console.log(food)

    try {
        await food.save();
        res.status(200).json({
            success: true,
            message: "Food Added"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error adding food",
            error: error.message  // Provide more details about the error
        });
    }
}


// All food list.
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods,
            message: `Data Fetched Successfully`
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: `Error`
        })
    }
}

// Remove Food Item
const removeFood = async (req, res) => {
    try {
        // Ensure the food item exists
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }
        console.log(food)

        fs.unlink(`uploads/${food.image}`, ()=>{})

        // Remove the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({
            success: true,
            message: "Food Removed"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while removing food",
            error: error.message
        });
    }
};
export { addFood, listFood, removeFood };
