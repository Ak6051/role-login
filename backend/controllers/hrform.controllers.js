
const HR = require('../models/hrform.model');

// Save form data
exports.submitForm = async (req, res) => {
  try {
    const { websiteUrl, employeeCount } = req.body;
    const cvFiles = req.files.map((file) => file.path); // File paths from multer
    const newEntry = new HR({ websiteUrl, employeeCount, cvFiles });

    await newEntry.save();
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
};
