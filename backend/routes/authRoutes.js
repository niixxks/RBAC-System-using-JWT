const express = require('express');
const router = express.Router();
const { register, login, getProfile, getAllUsers } = require('../controllers/authController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
// @desc    Register user (Public)
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token (Public)
router.post('/login', login);

// Protected Route: Accessible to ALL logged-in users (Employee, Manager, Admin)
// @route   GET /api/auth/profile
// @desc    Get logged in user profile
router.get('/profile', verifyToken, authorizeRoles('employee', 'manager', 'admin'), getProfile);

// Protected Route: Accessible only to Managers and Admins
// @route   GET /api/auth/manager-reports
// @desc    Get detailed manager reports
router.get('/manager-reports', verifyToken, authorizeRoles('manager', 'admin'), (req, res) => {
    res.json({ message: `Manager access granted. ${req.user.username} can see sensitive reports.` });
});

// Protected Route: Accessible only to Admins
// @route   GET /api/auth/admin/users
// @desc    Get all system users
router.get('/admin/users', verifyToken, authorizeRoles('admin'), getAllUsers);

module.exports = router;