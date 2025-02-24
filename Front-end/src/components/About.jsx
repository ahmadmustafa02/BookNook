
// AboutUs.jsx
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Welcome to Book Nook
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your digital haven for literary adventures, where every page turn brings new discoveries.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-8 shadow-lg transform hover:scale-105 transition duration-300">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Vast Collection</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover millions of books across all genres, from timeless classics to contemporary bestsellers.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-8 shadow-lg transform hover:scale-105 transition duration-300">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Fast Delivery</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get your favorite books delivered to your doorstep with our lightning-fast shipping service.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-8 shadow-lg transform hover:scale-105 transition duration-300">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Best Prices</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enjoy exclusive discounts and competitive prices on our extensive book collection.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-blue-500 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto">
            At Book Nook, we believe in the transformative power of reading. Our mission is to make quality literature accessible to everyone, fostering a community of passionate readers and lifelong learners.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;