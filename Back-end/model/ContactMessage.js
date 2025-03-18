// models/ContactMessage.js
import mongoose from 'mongoose';

const contactMessageSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null // Optional for non-logged-in users
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Unread', 'Replied'],
        default: 'Unread'
    }
});

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;