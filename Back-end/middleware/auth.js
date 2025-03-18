// middleware/auth.js
import User from '../model/user.model.js';

const authMiddleware = async (req, res, next) => {
    try {
        const userId = req.headers['user-id'];
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: No user ID provided' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export default authMiddleware;