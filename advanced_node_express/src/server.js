import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { app } from "./app.js";

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(port, () =>
      console.log(`✅ Server running on http://localhost:${port}`),
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

start();
