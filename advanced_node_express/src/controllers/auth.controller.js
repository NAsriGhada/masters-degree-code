import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";

const signToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
};

const cookieOptions = () => {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd, // true in production (HTTPS)
    sameSite: isProd ? "none" : "lax", // if cross-site in prod, use "none" + secure
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
};

const sendTokenCookie = (res, user) => {
  const token = signToken(user);
  const cookieName = process.env.COOKIE_NAME || "jwt";
  res.cookie(cookieName, token, cookieOptions());
  return token;
};

export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password)
    return next(new AppError("EMAIL_AND_PASSWORD_REQUIRED", 400));
  if (password.length < 6) return next(new AppError("PASSWORD_TOO_SHORT", 400));

  const existing = await User.findOne({ email });
  if (existing) return next(new AppError("EMAIL_ALREADY_IN_USE", 409));

  const user = await User.create({ name, email, password, provider: "local" });

  sendTokenCookie(res, user);

  res.status(201).json({
    status: "success",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      provider: user.provider,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("EMAIL_AND_PASSWORD_REQUIRED", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.password)
    return next(new AppError("INVALID_CREDENTIALS", 401));

  const ok = await user.correctPassword(password, user.password);
  if (!ok) return next(new AppError("INVALID_CREDENTIALS", 401));

  sendTokenCookie(res, user);

  res.status(200).json({
    status: "success",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      provider: user.provider,
    },
  });
});

export const logout = (req, res) => {
  const cookieName = process.env.COOKIE_NAME || "jwt";
  res.clearCookie(cookieName, { httpOnly: true });
  res.status(200).json({ status: "success", message: "Logged out" });
};

// Passport puts the user in req.user after Google auth
export const googleCallbackSuccess = (req, res) => {
  // req.user is your DB user
  sendTokenCookie(res, req.user);

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  // you can redirect to frontend after login
  res.redirect(`${clientUrl}/auth/success`);
};
