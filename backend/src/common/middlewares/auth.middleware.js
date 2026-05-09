import jwt from "jsonwebtoken";
import User from "../../modules/users/user.model.js";

const authMiddleware = async (
  req,
  res,
  next
) => {
  const authHeader =
    req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.id
    ).select(
      "_id tenantId name email role isActive"
    );

    if (!user || !user.isActive) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = {
      id: user._id.toString(),
      _id: user._id,
      tenantId: user.tenantId,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
