import Lead from "./lead.model.js";
import {
  createLeadService,
  deleteLeadService,
  getLeadByIdService,
  getLeadsService,
  updateLeadService,
  bulkCreateLeadsService,
} from "./lead.service.js";
import {
  createActivity,
} from "../activity/activity.service.js";
import {
  runLeadStatusAutomations,
} from "../automations/automation.service.js";
import {
  successResponse,
} from "../../common/utils/apiResponse.js";

export const createLead = async (
  req,
  res,
  next
) => {
  try {
    const lead =
      await createLeadService(
        req.body,
        req.user
      );

    return successResponse(res, {
      statusCode: 201,
      message:
        "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

export const bulkCreateLeads = async (
  req,
  res,
  next
) => {
  try {
    const leads =
      await bulkCreateLeadsService(
        req.body.leads,
        req.user
      );

    return successResponse(res, {
      statusCode: 201,
      message:
        "Leads imported successfully",
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await getLeadsService(
        req.query,
        req.user
      );

    return successResponse(res, {
      message:
        "Leads fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (
  req,
  res,
  next
) => {
  try {
    const lead =
      await getLeadByIdService(
        req.params.id,
        req.user
      );

    return successResponse(res, {
      message:
        "Lead fetched successfully",
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (
  req,
  res,
  next
) => {
  try {
    const lead =
      await updateLeadService(
        req.params.id,
        req.body,
        req.user
      );

    return successResponse(res, {
      message:
        "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await deleteLeadService(
        req.params.id,
        req.user
      );

    return successResponse(res, {
      message:
        "Lead deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLeadStatus = async (
  req,
  res,
  next
) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    const previousStatus =
      lead.status;

    lead.status = req.body.status;
    await lead.save();

    await createActivity({
      tenantId: req.user.tenantId,
      entityType: "lead",
      entityId: lead._id,
      action: "status_changed",
      description: `Status changed from ${previousStatus} to ${lead.status}`,
      performedBy: req.user.id,
      metadata: {
        previousStatus,
        newStatus: lead.status,
      },
    });

    await runLeadStatusAutomations({
      tenantId: req.user.tenantId,
      lead,
      previousStatus,
      nextStatus: lead.status,
      user: req.user,
    });

    return res.json(lead);
  } catch (error) {
    next(error);
  }
};

export const addLeadNote = async (
  req,
  res,
  next
) => {
  try {
    const text =
      req.body.note || req.body.text;

    const lead = await Lead.findOne({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    lead.notes.unshift({ text });
    await lead.save();

    await createActivity({
      tenantId: req.user.tenantId,
      entityType: "lead",
      entityId: lead._id,
      action: "note_added",
      description: "Note added",
      performedBy: req.user.id,
      metadata: { text },
    });

    return res.json(lead);
  } catch (error) {
    next(error);
  }
};

export const addTask = async (
  req,
  res,
  next
) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    lead.tasks.unshift({
      title: req.body.title,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
    });

    await lead.save();

    const task = lead.tasks[0];

    await createActivity({
      tenantId: req.user.tenantId,
      entityType: "lead",
      entityId: lead._id,
      action: "task_created",
      description: `Task "${task.title}" created`,
      performedBy: req.user.id,
      metadata: {
        taskId: task._id,
        priority: task.priority,
        dueDate: task.dueDate,
      },
    });

    return res.json(lead);
  } catch (error) {
    next(error);
  }
};

export const toggleTask = async (
  req,
  res,
  next
) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.leadId,
      tenantId: req.user.tenantId,
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    const task = lead.tasks.id(
      req.params.taskId
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.completed = !task.completed;
    await lead.save();

    await createActivity({
      tenantId: req.user.tenantId,
      entityType: "lead",
      entityId: lead._id,
      action: task.completed
        ? "task_completed"
        : "task_reopened",
      description: task.completed
        ? `Task "${task.title}" completed`
        : `Task "${task.title}" reopened`,
      performedBy: req.user.id,
      metadata: {
        taskId: task._id,
        completed: task.completed,
      },
    });

    return res.json(lead);
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
    const lead = await Lead.findOne({
      _id: req.params.leadId,
      tenantId: req.user.tenantId,
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    const task = lead.tasks.id(
      req.params.taskId
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const title = task.title;
    lead.tasks.pull(req.params.taskId);
    await lead.save();

    await createActivity({
      tenantId: req.user.tenantId,
      entityType: "lead",
      entityId: lead._id,
      action: "task_deleted",
      description: `Task "${title}" deleted`,
      performedBy: req.user.id,
      metadata: {
        taskId: req.params.taskId,
      },
    });

    return res.json(lead);
  } catch (error) {
    next(error);
  }
};
