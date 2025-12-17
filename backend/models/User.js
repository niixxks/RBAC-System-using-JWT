const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    // Define the allowed roles explicitly
    enum: ["employee", "manager", "admin"], 
    default: "employee" 
  },
  lastLogin: { type: Date, default: Date.now } // Optional: A professional touch
});

module.exports = mongoose.model("User", UserSchema);