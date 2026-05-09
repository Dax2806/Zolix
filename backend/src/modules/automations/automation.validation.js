import Joi from "joi";

export const createAutomationSchema =
  Joi.object({
    name: Joi.string()
      .min(2)
      .required(),

    trigger: Joi.string()
      .valid("lead_status_changed")
      .required(),

    conditions: Joi.object({
      fromStatus: Joi.string()
        .allow("")
        .optional(),
      toStatus: Joi.string()
        .allow("")
        .optional(),
    }).default({}),

    action: Joi.string()
      .valid("create_task")
      .required(),

    actionConfig: Joi.object({
      title: Joi.string()
        .min(2)
        .required(),
      priority: Joi.string()
        .valid(
          "low",
          "medium",
          "high"
        )
        .default("medium"),
      dueInDays: Joi.number()
        .min(0)
        .max(365)
        .default(1),
    }).required(),

    isActive: Joi.boolean().default(
      true
    ),
  });

export const updateAutomationSchema =
  createAutomationSchema
    .fork(
      [
        "name",
        "trigger",
        "action",
        "actionConfig",
      ],
      (schema) => schema.optional()
    )
    .min(1);
