import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

function Contact() {
    const [authUser] = useAuth();
    const [formData, setFormData] = useState({
        name: authUser?.fullName || '',
        email: authUser?.email || '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4001/contact', formData);
            alert('Message sent successfully!');
            setFormData({ ...formData, subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error sending message.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                                Get in Touch
                            </h1>
                            <div className="w-20 h-1 bg-blue-500 rounded"></div>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Have questions about a book? Want to organize a book club? Or just want to say hello? 
                            We'd love to hear from you!
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold dark:text-white">Email Us</h3>
                                    <p className="text-gray-600 dark:text-gray-300">ahmad@booknook.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold dark:text-white">Visit Us</h3>
                                    <p className="text-gray-600 dark:text-gray-300">123 Book Street, Reading City</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-slate-600 dark:border-slate-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-slate-600 dark:border-slate-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-slate-600 dark:border-slate-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-slate-600 dark:border-slate-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 transform hover:scale-105"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;