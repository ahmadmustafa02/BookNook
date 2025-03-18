// models/FAQ.js
import mongoose from 'mongoose';

const faqSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'General'
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;