import {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
} from "./task.service.js";

import {
  successResponse,
} from "../../common/utils/apiResponse.js";

export const createTask = async (
  req,
  res,
  next
) => {
  try {
    const task =
      await createTaskService(
        req.body,
        req.user
      );

    return successResponse(res, {
      statusCode: 201,
      message:
        "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  req,
  res,
  next
) => {
  try {
    const tasks =
      await getTasksService(
        req.query,
        req.user
      );

    return successResponse(res, {
      message:
        "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req,
  res,
  next
) => {
  try {
    const task =
      await updateTaskService(
        req.params.id,
        req.body,
        req.user
      );

    return successResponse(res, {
      message:
        "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await deleteTaskService(
        req.params.id,
        req.user
      );

    return successResponse(res, {
      message:
        "Task deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};