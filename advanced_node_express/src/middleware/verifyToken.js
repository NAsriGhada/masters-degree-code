import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const verifyToken = (req, res, next) => {
  const cookieName = process.env.COOKIE_NAME || "jwt";

  const tokenFromCookie = req.cookies?.[cookieName];
  const tokenFromHeader = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  const token = tokenFromCookie || tokenFromHeader;

  if (!token) return next(new AppError("UNAUTHORIZED", 401));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch {
    next(new AppError("UNAUTHORIZED", 401));
  }
};
