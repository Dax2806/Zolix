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
      .valid("create_task", "send_email")
      .required(),

    actionConfig: Joi.object({
      title: Joi.when(Joi.ref('...action'), {
        is: 'create_task',
        then: Joi.string().min(2).required(),
        otherwise: Joi.string().optional().allow("")
      }),
      priority: Joi.string()
        .valid("low", "medium", "high")
        .default("medium"),
      dueInDays: Joi.number()
        .min(0)
        .max(365)
        .default(1),
      emailSubject: Joi.when(Joi.ref('...action'), {
        is: 'send_email',
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow("")
      }),
      emailBody: Joi.when(Joi.ref('...action'), {
        is: 'send_email',
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow("")
      })
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
