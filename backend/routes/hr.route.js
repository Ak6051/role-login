// routes/userRoutes.js (or similar)
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Fetch all HR users
router.get('/hr-users', async (req, res) => {
    try {
        const hrUsers = await User.find({ role: 'HR' });
        res.json(hrUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching HR users', error });
    }
});

module.exports = router;
