import bcrypt from "bcryptjs";
import crypto from "crypto";
import AppError from "../../common/errors/AppError.js";
import User from "./user.model.js";
import { sendInviteEmail } from "../../common/services/email.service.js";

const publicFields =
  "_id name email role isActive status createdAt";

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

    const inviteToken = crypto.randomBytes(32).toString("hex");

    const createdUser =
      await User.create({
        tenantId: user.tenantId,
        email: data.email,
        role: data.role,
        status: "invited",
        inviteToken,
      });

    // Send the invite email
    await sendInviteEmail(data.email, inviteToken);

    const userObj = await User.findById(
      createdUser._id
    ).select(publicFields).lean();

    return {
      ...userObj,
      inviteToken, // Return the token so the admin can copy it
    };
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

export const getInviteService = async (token) => {
  const user = await User.findOne({ inviteToken: token, status: "invited" });
  if (!user) {
    throw new AppError("Invalid or expired invitation token", 400);
  }
  return { email: user.email };
};

export const acceptInviteService = async (token, name, password) => {
  const user = await User.findOne({ inviteToken: token, status: "invited" });
  if (!user) {
    throw new AppError("Invalid or expired invitation token", 400);
  }

  if (!name || !password || password.length < 6) {
    throw new AppError("Name and a valid password (min 6 chars) are required", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.name = name;
  user.password = hashedPassword;
  user.status = "active";
  user.inviteToken = undefined;

  await user.save();

  return { message: "Invitation accepted successfully" };
};
