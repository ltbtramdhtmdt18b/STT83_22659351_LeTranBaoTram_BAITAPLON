// Import necessary libraries
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

var currentUserName = "";

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already in use" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Error during registration:", err); // Log the error to the console for easier tracking
    res.status(500).json({ message: "An error occurred" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Login successful" });
    console.log(user);
  } catch (err) {
    console.error("Error during login:", err); // Log the error to the console
    res.status(500).json({ message: "An error occurred" });
  }
});

// Cập nhật thông tin người dùng
router.put("/save", async (req, res) => {
  try {
    const { username, name, address, phone, email } = req.body; // Lấy thông tin từ request body

    // Tìm user dựa trên username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Cập nhật thông tin người dùng
    user.name = name || user.name;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    user.email = email || user.email;

    // Lưu lại user đã cập nhật
    await user.save();

    res
      .status(200)
      .json({ message: "User information updated successfully", user });
  } catch (err) {
    console.error("Error updating user information:", err);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Export router for use in other files
module.exports = router;
