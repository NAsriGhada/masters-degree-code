// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
import User from "./models/User.js";

// Load environment variables from ./config/.env
dotenv.config({ path: "./config/.env" });

const app = express();

// Built-in middleware to parse JSON request bodies
app.use(express.json());

// 1) Connect to MongoDB using Mongoose
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // options are mostly auto in modern Mongoose; left here for clarity
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit if DB connection fails
  }
}
connectDB();

/**
 * ROUTES (CRUD)
 * Base path: /api/users
 */

// 2) GET: Return all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // newest first
    return res.status(200).json(users);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

// 3) POST: Add a new user to the database
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Basic presence check (Mongoose will also validate)
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const created = await User.create({ name, email, age });
    return res.status(201).json(created);
  } catch (err) {
    // Handle duplicate email or validation errors cleanly
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already exists." });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

// 4) PUT: Edit a user by ID
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // { new: true } returns the updated doc; runValidators ensures schema rules on update
    const updated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(updated);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID." });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

// 5) DELETE: Remove a user by ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ message: "User deleted.", user: deleted });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID." });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
