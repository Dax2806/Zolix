import AppError from "../errors/AppError.js";
import Tenant from "../../modules/tenants/tenant.model.js";
import Lead from "../../modules/leads/lead.model.js";
import Task from "../../modules/tasks/task.model.js";
import User from "../../modules/users/user.model.js";
import {
  getPlanConfig,
} from "../constants/plans.js";

const modelByResource = {
  leads: Lead,
  tasks: Task,
  users: User,
};

const limitKeyByResource = {
  leads: "leadLimit",
  tasks: "taskLimit",
  users: "userLimit",
};

const planLimit = (resource) => {
  return async (req, res, next) => {
    try {
      const Model =
        modelByResource[resource];
      const limitKey =
        limitKeyByResource[resource];

      if (!Model || !limitKey) {
        return next();
      }

      const tenant =
        await Tenant.findById(
          req.user.tenantId
        );

      if (!tenant) {
        return next(
          new AppError(
            "Tenant not found",
            404
          )
        );
      }

      const planConfig =
        getPlanConfig(tenant.plan);

      const limit =
        planConfig[limitKey];

      if (limit === null) {
        return next();
      }

      const count =
        await Model.countDocuments({
          tenantId: req.user.tenantId,
        });

      if (count >= limit) {
        return next(
          new AppError(
            `${planConfig.name} plan limit reached for ${resource}`,
            402
          )
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default planLimit;
