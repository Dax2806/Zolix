import Joi from "joi";

export const createTaskSchema =
  Joi.object({
    leadId: Joi.string().optional(),

    title: Joi.string()
      .min(3)
      .required(),

    description: Joi.string().allow(""),

    priority: Joi.string().valid(
      "low",
      "medium",
      "high"
    ),

    dueDate: Joi.date().required(),

    assignedTo: Joi.string().optional(),
  });
