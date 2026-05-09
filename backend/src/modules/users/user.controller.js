import {
  successResponse,
} from "../../common/utils/apiResponse.js";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  updateUserService,
} from "./user.service.js";

export const getUsers = async (
  req,
  res,
  next
) => {
  try {
    const users =
      await getUsersService(req.user);

    return successResponse(res, {
      message:
        "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await createUserService(
        req.body,
        req.user
      );

    return successResponse(res, {
      statusCode: 201,
      message:
        "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req,
  res,
  next
) => {
  try {
    const user =
      await updateUserService(
        req.params.id,
        req.body,
        req.user
      );

    return successResponse(res, {
      message:
        "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await deleteUserService(
        req.params.id,
        req.user
      );

    return successResponse(res, {
      message:
        "User deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
