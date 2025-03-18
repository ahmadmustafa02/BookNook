// models/Announcement.js
import mongoose from 'mongoose';

const announcementSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;