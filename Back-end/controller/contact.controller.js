// controller/contact.controller.js
import ContactMessage from '../model/ContactMessage.js';

export const createContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const contactMessage = new ContactMessage({ name, email, subject, message });
        await contactMessage.save();

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// For admin to view messages
export const getContactMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};