import userModel from '../models/userModels.js'

// Add items to user cart

export const addToCart = async (req, res) => {
    try {
        // Fetch the user data based on the userId from the request body
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Get the user's cart data
        let cartData = userData.cartData;

        // If the item does not exist in the cart, set the quantity to 1, otherwise increment it
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Return a success response
        return res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            cartData,
        });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding item to cart",
        });
    }
};



// Remove from cart
export const removeFromCart = async (req, res) => {
    try {
        // Fetch the user data based on the userId from the request body
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Get the user's cart data
        let cartData = userData.cartData;

        // Check if the item exists in the cart
        if (cartData[req.body.itemId]) {
            cartData[req.body.itemId] -= 1;

            // If the item quantity becomes zero, remove it from the cart
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }

            // Update the user's cart data in the database
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });

            return res.status(200).json({
                success: true,
                message: "Item removed from cart",
                cartData,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Item not found in cart",
            });
        }

    } catch (error) {
        console.error("Error removing item from cart:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while removing the item from the cart",
        });
    }
};

// Fetch User Cart Data.
export const getCart = async (req, res) => {
    try {
        // Fetch the user data based on the userId from the request body
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Get the user's cart data
        let cartData = userData.cartData;

        // If cart data is not found, return an empty cart
        if (!cartData || Object.keys(cartData).length === 0) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cartData: {},
            });
        }

        // Return the cart data
        return res.status(200).json({
            success: true,
            cartData,
        });

    } catch (error) {
        console.error("Error fetching cart data:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the cart data",
        });
    }
};
