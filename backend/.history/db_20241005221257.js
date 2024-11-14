const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sports_store", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
