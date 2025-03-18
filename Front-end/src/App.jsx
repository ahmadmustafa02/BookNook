import React, { useState, useEffect } from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import AuthProvider, { useAuth } from "./context/AuthProvider";
import About from "./components/About";
import Contact from "./components/Contact";
import Reviews from "./components/Reviews";
import Wishlist from "./components/Wishlist";
import Discounts from "./components/Discounts";
import FAQ from "./components/FAQ";
import { SearchProvider } from "./context/SearchProvider";
import Loading from "./components/Loading";
import ErrorBoundary from "./components/ErrorBoundary";
import Announcements from "./components/Announcements";
import Order from "./components/Order";
import Login from "./components/Login"; // Add this if you want a login page

function App() {
    const [authUser] = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
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
                        <Route path="/reviews/:id" element={<Reviews />} />
                        <Route path="/wishlist" element={authUser ? <Wishlist /> : <Navigate to="/signup" />} />
                        <Route path="/discounts" element={authUser ? <Discounts /> : <Navigate to="/signup" />} />
                        <Route path="/faq" element={<ErrorBoundary><FAQ /></ErrorBoundary>} />
                        <Route path="/announcements" element={<ErrorBoundary><Announcements /></ErrorBoundary>} />
                        <Route path="/order/:id" element={authUser ? <Order /> : <Navigate to="/signup" />} />
                        <Route path="/login" element={<Login />} /> {/* Add this if you create a Login component */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <Toaster />
                </div>
            </SearchProvider>
        </AuthProvider>
    );
}

export default App;