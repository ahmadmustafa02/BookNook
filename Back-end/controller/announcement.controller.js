import Announcement from '../model/Announcement.js';

export const getAnnouncements = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentDateOnly = new Date(currentDate.toDateString());
        console.log('Current date (date-only, UTC):', currentDateOnly);

        // Log all raw announcements to debug data
        const allAnnouncements = await Announcement.find();
        console.log('All announcements count:', allAnnouncements.length);
        allAnnouncements.forEach(a => console.log('Raw announcement:', {
            title: a.title,
            isActive: a.isActive,
            startDate: a.startDate,
            endDate: a.endDate
        }));

        // Fetch only active announcements (no date filter for now)
        const announcements = await Announcement.find({ isActive: true });
        console.log('Fetched announcements (isActive only) count:', announcements.length);
        announcements.forEach(a => console.log('Fetched announcement:', {
            title: a.title,
            startDate: a.startDate,
            endDate: a.endDate
        }));

        res.status(200).json(announcements);
    } catch (error) {
        console.error('Error in getAnnouncements:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// For admin to create announcements
export const createAnnouncement = async (req, res) => {
    try {
        const { title, content, startDate, endDate } = req.body;
        console.log('Creating announcement:', { title, content, startDate, endDate });
        const announcement = new Announcement({ title, content, startDate, endDate });
        await announcement.save();
        res.status(201).json({ message: 'Announcement created' });
    } catch (error) {
        console.error('Error in createAnnouncement:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};