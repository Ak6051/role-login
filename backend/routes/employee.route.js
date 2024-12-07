// routes/employeeRoutes.js
const express = require('express');
const {
  createEmployee,
  upload,
  fetchEmployees,
  newcreateEmployee,
  updateEmployee,
  deleteEmployee,
  getCompanyNames,
} = require('../controllers/employee.controllers');
const router = express.Router();

router.post(
  '/employee',
  upload.fields([{ name: 'photo' }, { name: 'signature' }]),
  createEmployee
);

router.post('/employees-data', newcreateEmployee);
router.get('/employees-data', fetchEmployees);
router.put('/employees-data/:id', updateEmployee);
router.delete('/employees-data/:id', deleteEmployee);
router.get('/company-names', getCompanyNames);

module.exports = router;
