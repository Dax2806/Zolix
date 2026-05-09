import bcrypt from "bcryptjs";
import AppError from "../../common/errors/AppError.js";
import User from "./user.model.js";

const publicFields =
  "_id name email role isActive createdAt";

export const getUsersService =
  async (user) => {
    return User.find({
      tenantId: user.tenantId,
    })
      .select(publicFields)
      .sort({ createdAt: -1 });
  };

export const createUserService =
  async (data, user) => {
    const existingUser =
      await User.findOne({
        email: data.email,
      });

    if (existingUser) {
      throw new AppError(
        "User already exists",
        409
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10
      );

    const createdUser =
      await User.create({
        tenantId: user.tenantId,
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      });

    return User.findById(
      createdUser._id
    ).select(publicFields);
  };

export const updateUserService =
  async (id, data, user) => {
    if (id === user.id) {
      throw new AppError(
        "You cannot update your own access from here",
        400
      );
    }

    const targetUser =
      await User.findOne({
        _id: id,
        tenantId: user.tenantId,
      });

    if (!targetUser) {
      throw new AppError(
        "User not found",
        404
      );
    }

    if (targetUser.role === "owner") {
      throw new AppError(
        "Owner access cannot be changed",
        403
      );
    }

    Object.assign(targetUser, data);
    await targetUser.save();

    return User.findById(id).select(
      publicFields
    );
  };

export const deleteUserService =
  async (id, user) => {
    if (id === user.id) {
      throw new AppError(
        "You cannot remove yourself",
        400
      );
    }

    const targetUser =
      await User.findOne({
        _id: id,
        tenantId: user.tenantId,
      });

    if (!targetUser) {
      throw new AppError(
        "User not found",
        404
      );
    }

    if (targetUser.role === "owner") {
      throw new AppError(
        "Owner cannot be removed",
        403
      );
    }

    await targetUser.deleteOne();

    return {
      deletedUserId: id,
    };
  };
