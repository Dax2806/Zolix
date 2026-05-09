import bcrypt from "bcryptjs";

import User from "../users/user.model.js";
import Tenant from "../tenants/tenant.model.js";

import generateToken from "../../common/utils/generateToken.js";

export const registerUser = async (data) => {
  const {
    businessName,
    name,
    email,
    password,
  } = data;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create tenant
  const tenant = await Tenant.create({
    name: businessName,
    slug: businessName
      .toLowerCase()
      .replace(/\s+/g, "-"),
  });

  // Hash password
  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  // Create user
  const user = await User.create({
    tenantId: tenant._id,
    name,
    email,
    password: hashedPassword,
    role: "owner",
  });

  // Generate token
  const token = generateToken({
    id: user._id,
    tenantId: tenant._id,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    tenant,
  };
};

export const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!user.isActive) {
    throw new Error("Account is disabled");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user._id,
    tenantId: user.tenantId,
    role: user.role,
  });

  return {
    token,
    user,
  };
};
