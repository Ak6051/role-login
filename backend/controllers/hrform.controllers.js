// const HR = require('../models/hrform.model');

// // Save form data
// exports.submitForm = async (req, res) => {
//   try {
//     const { websiteUrl, employeeCount } = req.body;
//     const cvFiles = req.files.map((file) => file.path); // File paths from multer
//     const newEntry = new HR({ websiteUrl, employeeCount, cvFiles });

//     await newEntry.save();
//     res.status(201).json({ message: 'Form submitted successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong!' });
//   }
// };
const HR = require('../models/hrform.model');

// Submit Form with File Upload
exports.submitForm = async (req, res) => {
  try {
    const {
      selectedCompany: companyName,
      websiteUrl,
      employeeCount,
    } = req.body;
    const cvFiles = req.files.map((file) => ({
      filename: file.originalname,
      path: file.path,
    }));

    const newEntry = new HR({
      companyName,
      websiteUrl,
      employeeCount,
      cvFiles,
    });
    await newEntry.save();

    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong!' });
  }
};

// Fetch All HR Forms
exports.fetchForms = async (req, res) => {
  try {
    const hrForms = await HR.find();
    res.status(200).json(hrForms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch HRForm data' });
  }
};
