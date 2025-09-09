// models/User.js
import mongoose from "mongoose";

// Define a simple User schema with some basic validations.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // ensure unique emails
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
    },
  },
  { timestamps: true } // createdAt / updatedAt
);

// Export the model to use in server.js
const User = mongoose.model("User", userSchema);
export default User;
