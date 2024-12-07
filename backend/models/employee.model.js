const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  fathersName: String,
  occupation: String,
  permanentAddress: String,
  correspondentAddress: String,
  contactNo: String,
  education: String,
  boardUniversity: String,
  year: String,
  percentage: String,
  height: String,
  weight: String,
  birthDate: Date,
  age: String,
  bloodGroup: String,
  identityCard: String,
  companyName: String,
  designation: String,
  companyMobileNo: String,
  salary: String,
  willingToWork: String,
  preferredLocation: String,
  preferredDesignation: String,
  expectedSalary: String,
  photo: String, // Photo path
  signature: String, // Signature path
  assignedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale' },
});

module.exports = mongoose.model('Employee', employeeSchema);
