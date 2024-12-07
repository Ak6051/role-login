
const mongoose = require( 'mongoose');

const jobopenningsSchema = new mongoose.Schema({
  LeadBy: { type: String, required: true },
  companyName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  emailId: { type: String, required: true },
  callStatus: { type: String, required: true },
  meetingDate: { type: Date },
  meetingTime: { type: String },
  contactPerson: { type: String, required: true },
  designation: { type: String, required: true },
  description: { type: String, required: true },
  assignedHR: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
})

const jobopennings = mongoose.model('jobopennings', jobopenningsSchema  );

module.exports = jobopennings ; 


