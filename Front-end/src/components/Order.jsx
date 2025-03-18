import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Order() {
    const [authUser] = useAuth();
    const { id } = useParams(); // bookId from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: authUser?.fullName || "",
        email: authUser?.email || "",
        address: "",
        contact: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!authUser) {
            alert("Please log in to place an order.");
            navigate("/signup");
            return;
        }

        console.log("authUser:", authUser); // Debug log
        console.log("Form Data:", { ...formData, bookId: id }); // Debug log
        console.log("Headers:", { "user-id": authUser._id }); // Changed from authUser.id to authUser._id

        try {
            const response = await axios.post(
                "http://localhost:4001/order",
                { ...formData, bookId: id },
                { headers: { "user-id": authUser._id } } // Changed from authUser.id to authUser._id
            );
            alert("Order placed successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error placing order:", error.response ? error.response.data : error.message);
            alert("Error placing order: " + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Place Your Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300">Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
                >
                    Buy Now
                </button>
            </form>
        </div>
    );
}

export default Order;