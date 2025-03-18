import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Course() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get('http://localhost:4001/book');
        console.log('Books data:', res.data); // Updated log for clarity
        setBook(res.data);
      } catch (error) {
        console.error('Error fetching books:', error); // Updated error log
      }
    };
    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-800 min-h-screen pt-20">
      <div className="mt-28 items-center justify-center text-center">
        <h1 className="text-2xl font-semibold md:text-4xl dark:text-white">
          We're delighted to have you<span className="text-pink-500"> Here! :) </span>
        </h1>

        <p className="mt-12 dark:text-gray-300">
          Welcome to Book Nook, your go-to destination for premium courses and books. Unlock expert knowledge, enhance your skills, and achieve your goals today!
        </p>

        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700">
            Back
          </button>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {book.map((item) => (
          <Cards key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Course;