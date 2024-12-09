const mongoose = require('mongoose');

const hrFormSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  employeeCount: { type: Number, required: true },
  cvFiles: [
    {
      filename: { type: String, required: true },
      path: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('HR', hrFormSchema);
