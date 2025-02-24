import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import axios from "axios";
import { useAuth } from "../context/AuthProvider"; // Import auth context
import { useSearch } from "../context/SearchProvider"; // Import search context

const Freebook = () => {
  const [book, setBook] = useState([]);
  const [authUser] = useAuth(); // Get authentication status
  const { searchTerm } = useSearch(); // Get search term from context

  useEffect(() => {
    const getBook = async () => {
      try {
        if (searchTerm) {
          // Fetch search results
          const res = await axios.get(`http://localhost:4001/book/search?q=${searchTerm}`);
          let filteredBooks = res.data;

          if (!authUser) {
            // If not logged in, show only free books
            filteredBooks = filteredBooks.filter((data) => data.category === "Free");
          }
          // If logged in, show all categories (no additional filtering needed)
          setBook(filteredBooks);
        } else {
          // Default: Show only free books if no search term
          const res = await axios.get("http://localhost:4001/book");
          setBook(res.data.filter((data) => data.category === "Free"));
        }
      } catch (error) {
        console.log(error);
        setBook([]);
      }
    };
    getBook();
  }, [searchTerm, authUser]); // Re-run when searchTerm or authUser changes

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: true } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pb-10 dark:bg-slate-800">
      <div className="mb-0">
        <h1 className="text-lg md:text-3xl font-bold pb-2 dark:text-white">
          {searchTerm ? `Search Results for "${searchTerm}"` : "Free Books For You"}
        </h1>
      </div>
      <div className="px-4">
        {book.length > 0 ? (
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        ) : (
          <p className="dark:text-gray-300">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Freebook;