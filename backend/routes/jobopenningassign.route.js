const express = require('express');
const { getAssignedjob } = require('../controllers/jobopenningHrassign.Controllers');
const { protect } = require('../middleware/Hr.data.middleware');

const router = express.Router();

// Protected route for fetching assigned sales
router.get('/', protect, getAssignedjob);

module.exports = router;
