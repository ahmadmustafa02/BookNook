import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FAQ() {
    const [faqs, setFaqs] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchFaqs = async () => {
            setIsLoading(true); // Start loading
            try {
                console.log('Fetching FAQs...');
                const response = await axios.get('http://localhost:4001/faq');
                console.log('FAQ data:', response.data);

                if (!Array.isArray(response.data)) {
                    throw new Error('FAQ data is not an array');
                }

                setFaqs(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching FAQs:', error.message);
                setError('Failed to load FAQs. Check backend.');
                setFaqs([]); // Reset faqs to prevent rendering issues
            } finally {
                setIsLoading(false); // End loading
            }
        };
        fetchFaqs();
    }, []);

    console.log('Rendering FAQs:', { faqs, error, isLoading }); // Debug log before rendering

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center dark:text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 dark:text-white">Frequently Asked Questions</h1>
                {error && <p className="text-red-500">{error}</p>}
                {!error && (!Array.isArray(faqs) || faqs.length === 0) ? (
                    <p className="text-gray-600 dark:text-gray-300">No FAQs available.</p>
                ) : (
                    <div className="space-y-6">
                        {faqs.map(faq => {
                            console.log('Rendering FAQ:', faq); // Debug log for each FAQ
                            return (
                                <div key={faq._id || Math.random()} className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow">
                                    <h2 className="text-xl font-semibold dark:text-white">{faq.question || 'No question'}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2">{faq.answer || 'No answer'}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Category: {faq.category || 'General'}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FAQ;