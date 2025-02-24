import mongoose from "mongoose";

 
const bookSchema = mongoose.Schema({ 

     name: String,
     price: Number,
     category: String,
     image: String,
     title: String,

})

const Book= mongoose.model("Book", bookSchema);

//convert schema to model

//Book collection ma store hoga jo data bookschema wali fields ma aega


export default Book;