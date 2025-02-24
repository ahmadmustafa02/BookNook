import Book from '../model/book.model.js';

export const getBook=async (req,res)=>{
    try {
    const book=await Book.find();
    res.status(200).json(book)
 
        
    } catch (error) {
        console.log("error: ",error)
        res.status(500).json(error)
        
    }
};
export const searchBooks = async (req, res) => {
    try {
      const { q } = req.query; // Get the search query from the URL
      const books = await Book.find({
        $or: [
          { name: { $regex: q, $options: "i" } }, // Case-insensitive search on name
          { title: { $regex: q, $options: "i" } }, // Case-insensitive search on title
        ],
      });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "Error searching books", error });
    }
  };
