const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://b1gcorporationinquiry:zxcv2025@salescluster.rlbhg.mongodb.net/?retryWrites=true&w=majority&appName=SalesCluster";

const connectDB = async (app, PORT) => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");

    // Start the server after DB connection
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop execution if DB fails
  }
};

module.exports = connectDB;
