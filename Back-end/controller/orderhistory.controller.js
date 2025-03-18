// controller/orderhistory.controller.js
import OrderHistory from "../model/OrderHistory.js";

export const createOrder = async (req, res) => {
    try {
        const { bookId, fullName, email, address, contact } = req.body;
        const userId = req.headers["user-id"];
        console.log("Received order data:", { bookId, fullName, email, address, contact, userId }); // Debug log

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const newOrder = new OrderHistory({
            userId,
            bookId,
            fullName,
            email,
            address,
            contact
        });

        await newOrder.save();
        console.log("Order saved successfully:", newOrder); // Debug log
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error creating order:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};