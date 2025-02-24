import React, { useState, useEffect } from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import AuthProvider, { useAuth } from "./context/AuthProvider";
import About from "./components/About";
import Contact from "./components/Contact";
import { SearchProvider } from "./context/SearchProvider";
import Loading from "./components/Loading"; // Import the Loading component

function App() {
  const [authUser, setAuthUser] = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Simulate loading (replace with actual logic if needed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000); // Adjust duration as needed

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (isLoading) {
    return <Loading />; // Show loading animation while isLoading is true
  }

  return (
    <AuthProvider>
      <SearchProvider>
        <div className="dark:bg-slate-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/course"
              element={authUser ? <Courses /> : <Navigate to="/signup" />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Toaster />
        </div>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;