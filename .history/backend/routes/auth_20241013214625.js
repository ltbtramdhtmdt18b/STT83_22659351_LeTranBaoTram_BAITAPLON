const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Đăng ký người dùng
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kiểm tra xem email hoặc tên người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã được sử dụng" });

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo người dùng mới
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
});

// Đăng nhập người dùng
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email có tồn tại không
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác" });

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác" });

    // Tạo token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Đăng nhập thành công" });
  } catch (err) {
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
});

module.exports = router;
