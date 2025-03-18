import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Discounts() {
    const [discounts, setDiscounts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const response = await axios.get('http://localhost:4001/discount');
                console.log('Discounts data:', response.data);

                // Ensure response.data is an array
                if (!Array.isArray(response.data)) {
                    throw new Error('Discounts data is not an array');
                }

                setDiscounts(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching discounts:', error.message);
                setError('Failed to load discounts. Check backend.');
                setDiscounts([]); // Reset discounts to prevent rendering issues
            }
        };
        fetchDiscounts();
    }, []);

    console.log('Rendering discounts:', discounts); // Debug log before rendering

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 dark:text-white">Discounted Books</h1>
                {error && <p className="text-red-500">{error}</p>}
                {!error && (!Array.isArray(discounts) || discounts.length === 0) ? (
                    <p className="text-gray-600 dark:text-gray-300">No discounts available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {discounts.map(discount => {
                            console.log('Rendering discount:', discount); // Debug log for each discount
                            const book = discount.bookId || {};
                            const discountedPrice = book.price && discount.discountPercentage
                                ? (book.price - (book.price * discount.discountPercentage / 100)).toFixed(2)
                                : 'N/A';
                            return (
                                <div key={discount._id || Math.random()} className="card shadow-xl dark:bg-slate-700 p-4">
                                    <img
                                        src={book.image || 'default-image.jpg'}
                                        alt={book.name || 'Unknown Book'}
                                        className="w-full h-auto"
                                    />
                                    <div className="card-body dark:text-white">
                                        <h2 className="card-title">{book.name || 'Unknown Book'}</h2>
                                        <p>{book.title || 'No title'}</p>
                                        <p>Original Price: ${book.price || 'N/A'}</p>
                                        <p>Discount: {discount.discountPercentage || 0}%</p>
                                        <p>Discounted Price: ${discountedPrice}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Discounts;