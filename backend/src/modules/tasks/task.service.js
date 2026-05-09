import Task from "./task.model.js";
import AppError from "../../common/errors/AppError.js";
import {
  createActivity,
} from "../activity/activity.service.js";
import {
  createNotification,
} from "../notifications/notification.service.js";

export const createTaskService = async (
  data,
  user
) => {
  const task = await Task.create({
    ...data,
    assignedTo:
      data.assignedTo || user.id,
    tenantId: user.tenantId,
    createdBy: user.id,
  });

  await createActivity({
    tenantId: user.tenantId,
    entityType: data.leadId
      ? "lead"
      : "task",
    entityId: data.leadId || task._id,
    action: "task_created",
    description: `Task "${task.title}" created`,
    performedBy: user.id,
    metadata: {
      taskId: task._id,
      leadId: task.leadId,
      priority: task.priority,
      dueDate: task.dueDate,
    },
  });

  if (
    task.assignedTo &&
    task.assignedTo.toString() !==
      user.id
  ) {
    await createNotification({
      tenantId: user.tenantId,
      userId: task.assignedTo,
      type: "task_assigned",
      title: "New Task Assigned",
      message: `You have been assigned a new task: ${task.title}`,
      entityType: "task",
      entityId: task._id,
    });
  }

  return task;
};

export const getTasksService = async (
  query,
  user
) => {
  const {
    status,
    priority,
    assignedTo,
    overdue,
    page = 1,
    limit = 10,
  } = query;

  const filters = {
    tenantId: user.tenantId,
  };

  if (user.role === "staff") {
    filters.assignedTo = user.id;
  }

  if (status) filters.status = status;
  if (priority)
    filters.priority = priority;
  if (assignedTo)
    filters.assignedTo = assignedTo;

  if (overdue === "true") {
    filters.dueDate = {
      $lt: new Date(),
    };
    filters.status = {
      $ne: "completed",
    };
  }

  const skip = (page - 1) * limit;

  const tasks = await Task.find(filters)
    .populate(
      "assignedTo",
      "name email"
    )
    .populate("leadId", "name phone")
    .sort({ dueDate: 1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Task.countDocuments(
    filters
  );

  return {
    total,
    page: Number(page),
    limit: Number(limit),
    tasks,
  };
};

export const updateTaskService = async (
  id,
  data,
  user
) => {
  const existingTask =
    await Task.findOne({
      _id: id,
      tenantId: user.tenantId,
    });

  if (!existingTask) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  if (
    user.role === "staff" &&
    existingTask.assignedTo.toString() !==
      user.id
  ) {
    throw new AppError(
      "Access denied",
      403
    );
  }

  const task = await Task.findOneAndUpdate(
    {
      _id: id,
      tenantId: user.tenantId,
    },
    data,
    {
      new: true,
    }
  );

  await createActivity({
    tenantId: user.tenantId,
    entityType: task.leadId
      ? "lead"
      : "task",
    entityId: task.leadId || task._id,
    action: "task_updated",
    description: `Task "${task.title}" updated`,
    performedBy: user.id,
    metadata: {
      taskId: task._id,
      changedFields: Object.keys(data),
    },
  });

  return task;
};

export const deleteTaskService = async (
  id,
  user
) => {
  const task =
    await Task.findOneAndDelete({
      _id: id,
      tenantId: user.tenantId,
    });

  if (!task) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  await createActivity({
    tenantId: user.tenantId,
    entityType: task.leadId
      ? "lead"
      : "task",
    entityId: task.leadId || task._id,
    action: "task_deleted",
    description: `Task "${task.title}" deleted`,
    performedBy: user.id,
    metadata: {
      taskId: task._id,
    },
  });

  return {
    deletedTaskId: id,
  };
};
