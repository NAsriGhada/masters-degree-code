export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Operational errors (expected)
  if (err.isOperational) {
    return res.status(statusCode).json({
      status: err.status || "error",
      message: err.message,
    });
  }

  // Unknown / programming errors
  console.error("UNEXPECTED ERROR:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong.",
  });
};
