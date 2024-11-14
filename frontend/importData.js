// importData.js
const mongoose = require("mongoose");
const connectDB = require("../backend/db");
const Product = require("../backend/models/Product");
const { products } = require("./src/data");

const importData = async () => {
  try {
    // Kết nối đến MongoDB
    await connectDB();

    // Xóa toàn bộ sản phẩm trước khi import để tránh dữ liệu trùng lặp
    await Product.deleteMany();

    // Import dữ liệu từ data.js
    await Product.insertMany(products);

    console.log("Data imported successfully!");
    process.exit();
  } catch (err) {
    console.error("Error with data import", err);
    process.exit(1);
  }
};

importData();
