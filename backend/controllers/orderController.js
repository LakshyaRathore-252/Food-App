import orderModel from '../models/orderModels.js';
import userModel from '../models/userModels.js';
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Controller function to handle placing an order
export const placeOrder = async (req, res) => {

    const frontendUrl = process.env.FRONTENED_URL;  // Frontend URL for redirection after payment

    try {
        // Create a new order document using the orderModel schema
        const newOrder = new orderModel({
            userId: req.body.userId,      // User ID placing the order
            items: req.body.items,        // Array of items in the order
            amount: req.body.amount,      // Total amount for the order
            address: req.body.address,    // Delivery address
        });

        // Save the new order document to the database
        await newOrder.save();
        console.log("newOrder", newOrder);

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Map the order items to Stripe's line_items format for the payment session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",   // Currency set to INR
                product_data: {
                    name: item.name  // Name of the product
                },
                unit_amount: item.price * 100 * 80  // Convert price to smallest currency unit and account for exchange rate
            },
            quantity: item.quantity  // Quantity of the product ordered
        }));

        // Add delivery charges as a separate line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"  // Name of the additional line item
                },
                unit_amount: 2 * 100 * 80     // Set delivery charge in the smallest currency unit
            },
            quantity: 1,  // Fixed quantity for delivery charges
        });

        // Create a Stripe checkout session for the order
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,  // Pass the line items array
            mode: 'payment',  // Set the session mode to payment
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,  // Redirect URL on successful payment
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,  // Redirect URL on payment cancellation
        });

        // Respond with success and the session URL for the frontend to redirect to Stripe
        res.json({
            success: true,
            session_url: session.url
        });
    } catch (error) {
        console.log(error);  // Log any errors that occur during the process
        res.json({
            success: false,
            message: "Error while making payment"  // Respond with an error message if something goes wrong
        });
    }
}

export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({
                success: true,
                message: "Payment Successful"
            })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: false,
                message: "Payment Failed"
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Failed to verify payment"
        })
    }

}

export const userOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        return res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
    }
}

// Listing Order For the ADMIN PANEL.
export const listOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({});
        return res.json({
            success: true,
            data: orders,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error While Fetching Order"
        })
    }
}


// API for Updating the Status
export const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({
            success: true,
            message: "Status Updated ",

        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            messgae:"Failed to Update "
        })
    }
}