import Discount from '../model/Discount.js';

export const getDiscounts = async (req, res) => {
    try {
        const currentDateUTC = new Date(new Date().toISOString());
        console.log('Current date (UTC):', currentDateUTC);

        // Fetch all discounts without date filtering
        let discounts = await Discount.find().populate('bookId');
        console.log('All discounts before filtering:', discounts);

        // Apply only the bookId null check
        discounts = discounts.filter(discount => discount.bookId !== null);
        console.log('Fetched discounts after bookId filter:', discounts);

        res.status(200).json(discounts);
    } catch (error) {
        console.error('Error in getDiscounts:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// For admin to create discounts
export const createDiscount = async (req, res) => {
    try {
        const { bookId, discountPercentage, startDate, endDate } = req.body;
        console.log('Creating discount:', { bookId, discountPercentage, startDate, endDate });

        // Validate bookId
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Validate discountPercentage
        if (discountPercentage < 0 || discountPercentage > 100) {
            return res.status(400).json({ message: 'Discount percentage must be between 0 and 100' });
        }

        const discount = new Discount({ bookId, discountPercentage, startDate, endDate });
        await discount.save();
        res.status(201).json({ message: 'Discount created' });
    } catch (error) {
        console.error('Error in createDiscount:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};