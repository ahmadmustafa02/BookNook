import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

function Reviews() {
  const { id } = useParams(); // Should match the bookId from the URL
  const [authUser] = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/review/${id}`);
        console.log('Reviews data:', response.data);
        setReviews(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews. Check backend or book ID.');
      }
    };
    fetchReviews();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    console.log('AuthUser:', authUser); // Debug log
    if (!authUser) {
      alert('Please log in to submit a review.');
      return;
    }

    try {
      await axios.post('http://localhost:4001/review', {
        bookId: id,
        rating,
        comment
      }, {
        headers: { 'user-id': authUser._id }
      });
      alert('Review submitted!');
      const response = await axios.get(`http://localhost:4001/review/${id}`);
      setReviews(response.data);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmitReview} className="mb-4">
        <div className="mb-4">
          <label className="block">Rating (1-5)</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Review
        </button>
      </form>
      <h2 className="text-xl font-semibold">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review._id} className="border-b py-2">
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
              <p>By: {review.userId.fullName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reviews;