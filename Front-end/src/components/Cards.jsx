import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function Cards({ item }) {
    const [authUser] = useAuth();
    const navigate = useNavigate(); // Add this line

    const handleOpenPDF = async (e) => {
        e.stopPropagation();
        console.log('authUser:', authUser); // Debug log
        if (!authUser) {
            alert('Please log in to buy books.');
            return;
        }
        console.log('Navigating to order page for bookId:', item._id); // Debug log
        navigate(`/order/${item._id}`); // Redirect to order page
    };

    const handleAddToWishlist = async (e) => {
        e.stopPropagation();
        console.log('AuthUser:', authUser);
        console.log('Adding to wishlist, bookId:', item._id);
        if (!authUser) {
            alert('Please log in to add to wishlist.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:4001/wishlist', { bookId: item._id }, {
                headers: { 'user-id': authUser._id }
            });
            console.log('Wishlist response:', response.data);
            alert('Added to wishlist!');
        } catch (error) {
            console.error('Error adding to wishlist:', error.response ? error.response.data : error.message);
            alert('Error adding to wishlist: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="mt-10 p-4 w-full">
            <div className="card shadow-xl hover:scale-105 duration-200 dark:bg-slate-700 max-w-sm mx-auto cursor-pointer">
                <figure>
                    <img src={item.image} alt={item.name} className="w-full h-auto" />
                </figure>
                <div className="card-body dark:text-white">
                    <h2 className="card-title">
                        {item.name}
                        <div className="badge badge-secondary">{item.category}</div>
                    </h2>
                    <p className="dark:text-gray-300">{item.title}</p>
                    <div className="card-actions flex justify-between">
                        <div className="badge badge-outline dark:text-gray-300 dark:border-gray-300">${item.price}</div>
                        <button
                            onClick={handleOpenPDF}
                            className="cursor-pointer px-2 py-1 rounded-full hover:bg-pink-500 hover:text-white duration-200"
                        >
                            Buy Now
                        </button>
                        <button
                            onClick={handleAddToWishlist}
                            className="cursor-pointer px-2 py-1 rounded-full hover:bg-yellow-500 hover:text-white duration-200"
                        >
                            ⭐ Wishlist
                        </button>
                        <Link to={`/reviews/${item._id}`} className="text-blue-500">Reviews</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;