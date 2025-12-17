// In backend/controllers/authController.js, replace the entire file content.

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route   POST /api/auth/register
// @desc    Register user
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      username,
      password,
      // Default to employee if no role is provided
      role: role || "employee", 
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role, // Include role in payload
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.role, username: user.username });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save(); 

    const payload = {
      user: {
        id: user.id,
        role: user.role, // Include role in payload
        username: user.username,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" }, // Set short expiry for security
      (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.role, username: user.username });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


// @route   GET /api/auth/profile
// @desc    Get logged in user profile (Accessible to all authenticated users)
exports.getProfile = async (req, res) => {
  try {
    // req.user is set by the verifyToken middleware
    const user = await User.findById(req.user.id).select('-password'); 
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET /api/auth/admin/users
// @desc    Get list of all users (Admin Only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};