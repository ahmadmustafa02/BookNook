import Wishlist from '../model/Wishlist.js';
import Book from '../model/book.model.js'; // Import Book model for validation
import User from '../model/user.model.js'; // Import User model for validation

export const addToWishlist = async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user._id;

        console.log('Adding to wishlist:', { userId, bookId }); // Debug log

        // Validate userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate bookId
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if the item is already in the wishlist
        const existingItem = await Wishlist.findOne({ userId, bookId });
        if (existingItem) {
            return res.status(400).json({ message: 'Book already in wishlist' });
        }

        const wishlistItem = new Wishlist({ userId, bookId });
        await wishlistItem.save();

        res.status(201).json({ message: 'Added to wishlist' });
    } catch (error) {
        console.error('Error in addToWishlist:', error); // Detailed error logging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ userId: req.user._id }).populate('bookId');
        res.status(200).json(wishlist);
    } catch (error) {
        console.error('Error in getWishlist:', error); // Detailed error logging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Removed from wishlist' });
    } catch (error) {
        console.error('Error in removeFromWishlist:', error); // Detailed error logging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};