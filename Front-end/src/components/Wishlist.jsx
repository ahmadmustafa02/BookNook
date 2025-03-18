import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom'; // Added for linking to Reviews

function Wishlist() {
    const [authUser] = useAuth();
    const [wishlist, setWishlist] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('AuthUser:', authUser); // Debug log
        if (!authUser) {
            setError('Please log in to view your wishlist.');
            return;
        }

        const fetchWishlist = async () => {
            try {
                const response = await axios.get('http://localhost:4001/wishlist', { // Fixed URL
                    headers: { 'user-id': authUser._id }
                });
                console.log('Wishlist data:', response.data); // Debug log
                setWishlist(Array.isArray(response.data) ? response.data : []);
                setError(null);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
                setError('Failed to load wishlist. Check backend or login.');
            }
        };
        fetchWishlist();
    }, [authUser]);

    const handleRemove = async (id) => {
        if (!authUser) {
            alert('Please log in to remove items from your wishlist.');
            return;
        }

        try {
            await axios.delete(`http://localhost:4001/wishlist/${id}`, { // Fixed URL
                headers: { 'user-id': authUser._id }
            });
            setWishlist(wishlist.filter(item => item._id !== id));
            alert('Removed from wishlist!');
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            alert('Error removing from wishlist.');
        }
    };

    if (!authUser) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
                <div className="max-w-6xl mx-auto px-4">
                    <p className="text-gray-600 dark:text-gray-300">Please log in to view your wishlist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 dark:text-white">My Wishlist</h1>
                {error && <p className="text-red-500">{error}</p>}
                {!error && (!Array.isArray(wishlist) || wishlist.length === 0) ? (
                    <p className="text-gray-600 dark:text-gray-300">Your wishlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {wishlist.map(item => (
                            <div key={item._id} className="card shadow-xl dark:bg-slate-700 p-4">
                                <img
                                    src={item.bookId?.image || 'default-image.jpg'} // Fallback for missing image
                                    alt={item.bookId?.name || 'Unknown Book'}
                                    className="w-full h-auto"
                                />
                                <div className="card-body dark:text-white">
                                    <h2 className="card-title">{item.bookId?.name || 'Unknown Book'}</h2>
                                    <p>{item.bookId?.title || 'No title'}</p>
                                    <div className="flex justify-between mt-2">
                                        <Link to={`/reviews/${item.bookId?._id || ''}`} className="text-blue-500">
                                            Reviews
                                        </Link>
                                        <button
                                            onClick={() => handleRemove(item._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist;