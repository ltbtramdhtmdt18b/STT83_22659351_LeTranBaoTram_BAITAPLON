// Đăng nhập người dùng
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; // Thay đổi email thành username

    // Kiểm tra tên người dùng có tồn tại không
    const user = await User.findOne({ username }); // Kiểm tra theo tên người dùng
    if (!user)
      return res
        .status(400)
        .json({ message: "Tên người dùng hoặc mật khẩu không chính xác" });

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Tên người dùng hoặc mật khẩu không chính xác" });

    // Tạo token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, message: "Đăng nhập thành công" });
  } catch (err) {
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
});
