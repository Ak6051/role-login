const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Employee = require('../models/employee.model');
const Sale = require('../models/Sale');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

const createEmployee = async (req, res) => {
  try {
    const { body, files } = req;
    const photoPath = files.photo ? files.photo[0].path : null;
    const signaturePath = files.signature ? files.signature[0].path : null;

    const employeeData = {
      ...body,
      photo: photoPath,
      signature: signaturePath,
    };

    const newEmployee = new Employee(employeeData);
    await newEmployee.save();

    res
      .status(201)
      .json({ message: 'Employee data saved successfully', newEmployee });
  } catch (error) {
    console.error('Error saving employee data:', error);
    res.status(500).json({ message: 'Error saving employee data', error });
  }
};

//get employee data
const fetchEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const newcreateEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({
      message: 'Employee created successfully',
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const updateEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!employee) return res.status(404).json({ error: 'Employee not found' });
//     res
//       .status(200)
//       .json({ message: 'Employee updated successfully', employee });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const updateEmployee = async (req, res) => {
  try {
    const { body } = req;
    let companyId = body.assignedCompany;

    // If companyName is provided, find the ObjectId of the company
    if (body.assignedCompany && typeof body.assignedCompany === 'string') {
      const company = await Sale.findOne({ companyName: body.assignedCompany });
      if (company) {
        companyId = company._id; // Update with the ObjectId of the company
      } else {
        return res.status(400).json({ message: 'Company not found' });
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { ...body, assignedCompany: companyId },
      { new: true }
    );

    if (!updatedEmployee)
      return res.status(404).json({ message: 'Employee not found' });

    res
      .status(200)
      .json({ message: 'Employee updated successfully', updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompanyNames = async (req, res) => {
  try {
    const companyNames = await Sale.find({}, 'companyName'); // Only fetch the companyName field
    res.status(200).json(companyNames);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company names', error });
  }
};

module.exports = {
  createEmployee,
  upload,
  fetchEmployees,
  newcreateEmployee,
  updateEmployee,
  deleteEmployee,
  getCompanyNames,
};
