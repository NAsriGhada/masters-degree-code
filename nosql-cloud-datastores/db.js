// db.js
require("dotenv").config();
const mongoose = require("mongoose");

// NOTE: useNewUrlParser/useUnifiedTopology are harmless no-ops in Mongoose 7+,
// included here to match the checkpoint instructions.
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Optional: log connection status
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

module.exports = mongoose;
