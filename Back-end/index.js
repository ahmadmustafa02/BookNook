import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import reviewRoute from "./route/review.route.js";
import wishlistRoute from "./route/wishlist.route.js";
import faqRoute from "./route/faq.route.js";
import discountRoute from "./route/discount.route.js";
import contactRoute from "./route/contact.route.js";
import announcementRoute from "./route/announcement.route.js";
import orderRoute from "./route/order.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());


app.use(express.json());

const PORT = process.env.PORT || 4001;
const dbURL = process.env.MongoDB_URL;

// Connect to MongoDB
try {
    mongoose.connect(dbURL);
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
}

// Defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/review", reviewRoute);
app.use("/wishlist", wishlistRoute);
app.use("/faq", faqRoute);
app.use("/discount", discountRoute);
app.use("/contact", contactRoute);
app.use("/announcements", announcementRoute);
app.use("/order", orderRoute); // This will now correctly handle /order endpoint

app.listen(PORT, () => {
    console.log(`Server app listening on port ${PORT}`);
});