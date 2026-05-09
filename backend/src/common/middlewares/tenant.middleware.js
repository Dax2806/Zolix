import AppError from "../errors/AppError.js";

const tenantMiddleware = (
  req,
  res,
  next
) => {
  if (!req.user?.tenantId) {
    return next(
      new AppError(
        "Tenant context missing",
        403
      )
    );
  }

  req.tenantId = req.user.tenantId;

  next();
};

export default tenantMiddleware;
