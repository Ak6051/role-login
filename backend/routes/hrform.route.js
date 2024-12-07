
const express = require('express');
const { submitForm } = require('../controllers/hrform.controllers');
const HR = require('../models/hrform.model');

const multer = require('multer');
const router = express.Router();

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/submit', upload.array('cvFiles'), submitForm);

router.get('/fetch', async (req, res) => {
    try {
      const hrForms = await HR.find(); // Fetch all HRForm data
      res.status(200).json(hrForms);
    } catch (error) {
      console.error('Error fetching HRForm data:', error);
      res.status(500).json({ error: 'Failed to fetch HRForm data' });
    }
  });
module.exports = router;
