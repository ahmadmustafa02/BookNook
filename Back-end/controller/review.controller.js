// controller/review.controller.js
import Review from '../model/Review.js';

export const createReview = async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;
        const userId = req.user._id;

        const review = new Review({ userId, bookId, rating, comment });
        await review.save();

        res.status(201).json({ message: 'Review submitted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.bookId })
            .populate('userId', 'fullName');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};