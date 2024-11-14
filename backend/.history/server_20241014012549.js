require("dotenv").config();
const cors = require("cors");

const express = require("express");
const connectDB = require("./db");
const Product = require("./models/Product");
const authRoute = require("./routes/auth");

const app = express();

// Kết nối tới MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

// API lấy tất cả sản phẩm
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error("Error fetching products", err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
