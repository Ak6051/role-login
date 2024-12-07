
const mongoose = require('mongoose');

const HrSchema = new mongoose.Schema({
  websiteUrl: { type: String, required: true },
  employeeCount: { type: Number, required: true },
  cvFiles: [{ type: String }], // Store file paths
  createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('HR', HrSchema);
