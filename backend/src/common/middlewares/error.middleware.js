const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.error("ERROR =>", err);

  const statusCode =
    err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,

    message:
      err.message ||
      "Internal Server Error",

    errors: err.errors || null,

    stack:
      process.env.NODE_ENV ===
      "development"
        ? err.stack
        : undefined,
  });
};

export default errorMiddleware;