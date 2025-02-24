import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";

import bookRoute from "./route/book.route.js"

import cors from "cors";

import userRoute from "./route/user.route.js"


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Correct



const PORT = process.env.PORT || 4002;
const dbURL = process.env.MongoDB_URL;

//connnect to mongodb
try {
    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );
    console.log("Connected to MongoDB");
} catch (error) {
    console.log("Error connecting");
}


//defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

//middleware


app.listen(PORT, () => {
    console.log(`Server app listening on port ${PORT}`)
})