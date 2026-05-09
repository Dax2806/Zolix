import Joi from "joi";

export const createLeadSchema =
  Joi.object({
    name: Joi.string()
      .min(2)
      .required(),

    phone: Joi.string().required(),

    email: Joi.string().email().allow(""),

    source: Joi.string().allow(""),

    status: Joi.string().valid(
      "new",
      "contacted",
      "qualified",
      "follow_up",
      "converted",
      "lost"
    ),
  });