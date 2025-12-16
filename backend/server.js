require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path"); // Import path at the top
const connectDB = require("./config/db");

const app = express();

// 1. Connect to Database
connectDB();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Serve Frontend Static Files
// This allows files like dashboard.html, css/style.css, and js/auth.js to be loaded
app.use(express.static(path.join(__dirname, "../frontend")));

// 4. API Routes
app.use("/api/auth", require("./routes/authRoutes"));

// 5. Root Route (Serve Login Page)
// This must be the only handler for "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});