import AppError from "../../common/errors/AppError.js";
import Tenant from "../tenants/tenant.model.js";
import Lead from "../leads/lead.model.js";
import Task from "../tasks/task.model.js";
import User from "../users/user.model.js";
import {
  getPlanConfig,
  PLAN_LIMITS,
} from "../../common/constants/plans.js";

const getUsage = async (tenantId) => {
  const [
    leads,
    tasks,
    users,
  ] = await Promise.all([
    Lead.countDocuments({ tenantId }),
    Task.countDocuments({ tenantId }),
    User.countDocuments({ tenantId }),
  ]);

  return {
    leads,
    tasks,
    users,
  };
};

export const getPlansService = () => {
  return Object.entries(PLAN_LIMITS).map(
    ([id, config]) => ({
      id,
      ...config,
    })
  );
};

export const getBillingService =
  async (user) => {
    const tenant =
      await Tenant.findById(
        user.tenantId
      );

    if (!tenant) {
      throw new AppError(
        "Tenant not found",
        404
      );
    }

    return {
      tenant: {
        id: tenant._id,
        name: tenant.name,
        plan: tenant.plan,
        status: tenant.status,
      },
      plan: getPlanConfig(
        tenant.plan
      ),
      usage: await getUsage(
        user.tenantId
      ),
      plans: getPlansService(),
    };
  };

export const updatePlanService =
  async (plan, user) => {
    if (!PLAN_LIMITS[plan]) {
      throw new AppError(
        "Invalid plan",
        400
      );
    }

    const tenant =
      await Tenant.findByIdAndUpdate(
        user.tenantId,
        { plan },
        { new: true }
      );

    if (!tenant) {
      throw new AppError(
        "Tenant not found",
        404
      );
    }

    return getBillingService(user);
  };
