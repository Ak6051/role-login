const express = require('express');
const { getAssignedSales } = require('../controllers/Hr.controllers');
const { protect } = require('../middleware/Hr.data.middleware');

const router = express.Router();

// Protected route for fetching assigned sales
router.get('/assigned-sales', protect, getAssignedSales);

module.exports = router;
