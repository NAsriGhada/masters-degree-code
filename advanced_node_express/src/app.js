import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";

import { authRouter } from "./routes/auth.routes.js";
import { taskRouter } from "./routes/task.routes.js";
import { AppError } from "./utils/AppError.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { configurePassport } from "./config/passport.js";

export const app = express();

// If you have a frontend on different origin and you want cookies,
// you MUST enable credentials and specify origin.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Sanitizers
app.use(mongoSanitize());
app.use(xss());

// Passport
configurePassport();
app.use(passport.initialize());

// Routes
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);

// 404
app.all("*", (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

// Error handler (last)
app.use(errorHandler);
