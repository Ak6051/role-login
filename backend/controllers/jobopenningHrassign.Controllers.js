// // controllers/salesController.js
// const Sale = require('../models/Sale');

// const getAssignedSales = async (req, res) => {
//   try {
//     // Ensure only users with 'HR' role can access this
//     if (req.user.role !== 'HR') {
//       return res.status(403).json({ msg: 'Access denied' });
//     }

//     // Find sales assigned to the logged-in HR (using req.user.userId)
//     const assignedSales = await Sale.find({ assignedHR: req.user.userId });

//     res.json(assignedSales);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// };

// module.exports = { getAssignedSales };

const Sale = require('../models/jobopennings.modal'); // Model ko import karna
const User = require('../models/User'); // User model import for any user validation if needed

// Route to fetch sales assigned to logged-in HR
exports.getAssignedjob = async (req, res) => {
  try {
    // Currently logged-in HR user id
    const hrId = req.user._id;

    // Fetch sales where assignedHR matches logged-in HR's id
    const assignedSales = await Sale.find({ assignedHR: hrId });

    res.status(200).json({
      success: true,
      data: assignedSales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
