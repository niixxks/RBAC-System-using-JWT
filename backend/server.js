const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json()); // Allows server to read JSON data
app.use(cors()); // Allows frontend to talk to backend

// 1. CONNECT TO MONGODB (Replace with your local or Atlas URI)
mongoose.connect('mongodb://127.0.0.1:27017/ems-rbac')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const SECRET_KEY = "super_secret_key_123"; // In production, keep this in .env file

// 2. REGISTER ROUTE
app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    // Hash the password (encrypt it)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// 3. LOGIN ROUTE
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Create the "ID Card" (Token) containing the Role
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));