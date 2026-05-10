import Joi from "joi";

export const createUserSchema =
  Joi.object({
    email: Joi.string()
      .email()
      .required(),

    role: Joi.string()
      .valid(
        "admin",
        "manager",
        "staff"
      )
      .required(),
  });

export const updateUserSchema =
  Joi.object({
    name: Joi.string().min(2),
    role: Joi.string().valid(
      "admin",
      "manager",
      "staff"
    ),
    isActive: Joi.boolean(),
  }).min(1);
