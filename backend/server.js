require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet"); // NEW: For security headers
const rateLimit = require("express-rate-limit"); // NEW: For brute-force protection
const connectDB = require("./config/db");

const app = express();

// 1. Connect to Database
connectDB();

// 2. Security Middleware
app.use(helmet()); 
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: "Too many login attempts from this IP, please try again after 15 minutes"
});
app.use("/api/auth/login", loginLimiter); // Apply rate limit only to login route

// 3. General Middleware
app.use(cors());
app.use(express.json());

// 4. Serve Frontend Static Files
app.use(express.static(path.join(__dirname, "../frontend")));

// 5. API Routes
app.use("/api/auth", require("./routes/authRoutes"));

// 6. Root Route (Serve Login Page)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});