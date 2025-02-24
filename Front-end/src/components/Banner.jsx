import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import banner from '../../public/Banner2.png';

const Banner = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate('/signup'); // Redirect to /signup route
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row py-10 dark:bg-slate-800">
      <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
        <div className="space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold dark:text-white">
            Hello, welcomes here to learn something{" "}
            <span className="text-pink-500">new everyday!!!</span>
          </h1>
          <p className="text-sm md:text-xl dark:text-gray-300">
          Book Nook – your digital bookstore with bestsellers, classics, and new releases. Enjoy fast delivery, exclusive discounts, and seamless browsing!
          </p>
          <label className="input input-bordered flex items-center gap-2 dark:bg-slate-700 dark:border-slate-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 dark:text-gray-300"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow dark:bg-slate-700 dark:text-white" placeholder="Email" />
          </label>
        </div>
        <button
          className="btn mt-6 btn-secondary"
          onClick={handleGetStarted} // Add onClick handler
        >
          Get Started
        </button>
      </div>
      <div className="order-1 w-full mt-10 md:w-1/2">
        <img
          src={banner}
          className="md:w-[550px] md:h-[460px] md:ml-12"
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;