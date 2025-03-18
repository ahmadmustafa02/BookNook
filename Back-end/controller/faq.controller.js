// controller/faq.controller.js
import FAQ from '../model/FAQ.js';

export const getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find({ isActive: true });
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// For admin to create FAQs
export const createFAQ = async (req, res) => {
    try {
        const { question, answer, category } = req.body;
        const faq = new FAQ({ question, answer, category });
        await faq.save();
        res.status(201).json({ message: 'FAQ created' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};