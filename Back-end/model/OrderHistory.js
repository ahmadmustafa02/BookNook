import mongoose from "mongoose";

const orderHistorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", // Assuming you have a Book model
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);
export default OrderHistory;