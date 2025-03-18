import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setIsLoading(true);
            try {
                console.log('Fetching announcements...');
                const response = await axios.get('http://localhost:4001/announcements');
                console.log('Announcement data:', response.data);

                if (!Array.isArray(response.data)) {
                    throw new Error('Announcement data is not an array');
                }

                setAnnouncements(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching announcements:', error.message);
                setError('Failed to load announcements. Check backend.');
                setAnnouncements([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnnouncements();
    }, []);

    console.log('Rendering announcements:', { announcements, error, isLoading });

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center dark:text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 dark:text-white">Announcements</h1>
                {error && <p className="text-red-500">{error}</p>}
                {!error && (!Array.isArray(announcements) || announcements.length === 0) ? (
                    <p className="text-gray-600 dark:text-gray-300">No announcements available.</p>
                ) : (
                    <div className="space-y-6">
                        {announcements.map(announcement => (
                            <div key={announcement._id || Math.random()} className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow">
                                <h2 className="text-xl font-semibold dark:text-white">{announcement.title || 'No title'}</h2>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">{announcement.content || 'No content'}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Valid from: {new Date(announcement.startDate).toLocaleDateString()} to{' '}
                                    {new Date(announcement.endDate).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Announcements;