
const   jobopennings = require ('../models/jobopennings.modal');

exports.createjobopenning = async (req, res) => {
  try {
    const {
      LeadBy,
      companyName,
      phoneNumber,
      address,
      websiteUrl,
      emailId,
      callStatus,
      meetingDate,
      meetingTime,
      contactPerson,
      designation,
      description,
    } = req.body;

    const job = new jobopennings({
      LeadBy,
      companyName,
      phoneNumber,
      address,
      websiteUrl,
      emailId,
      callStatus,
      meetingDate,
      meetingTime,
      contactPerson,
      designation,
      description,
    });

    await job.save();
    res.status(201).json({ message: 'Sale created successfully!', job });
  } catch (error) {
    res.status(500).json({ message: 'Error creating sale', error: error.message });
  }
};
