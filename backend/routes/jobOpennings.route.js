



// routes/sales.js
const express = require('express');
const { createjobopenning } = require ('../controllers/jobopennings.Controllers');


const router = express.Router();

// Route for creating a new sale
router.post('/job', createjobopenning);

module.exports = router;
