import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,  // Corrected "require" to "required"
    },
    items: {
        type: Array,
        required: true,  // Corrected "require" to "required"
    },
    amount: {
        type: Number,
        required: true,  // Corrected "require" to "required"
    },
    address: {
        type: Object,
        required: true,  // Corrected "require" to "required"
    },
    status: {
        type: String,
        default: "Food Processing"
    },
    date: {
        type: Date,
        default: Date.now
    },
    payment: {
        type: Boolean,
        default: false,
    }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
