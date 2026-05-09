import {
  successResponse,
} from "../../common/utils/apiResponse.js";
import {
  getBillingService,
  getPlansService,
  updatePlanService,
} from "./billing.service.js";

export const getPlans = (
  req,
  res
) => {
  return successResponse(res, {
    message:
      "Plans fetched successfully",
    data: getPlansService(),
  });
};

export const getBilling =
  async (req, res, next) => {
    try {
      const billing =
        await getBillingService(
          req.user
        );

      return successResponse(res, {
        message:
          "Billing fetched successfully",
        data: billing,
      });
    } catch (error) {
      next(error);
    }
  };

export const updatePlan =
  async (req, res, next) => {
    try {
      const billing =
        await updatePlanService(
          req.body.plan,
          req.user
        );

      return successResponse(res, {
        message:
          "Plan updated successfully",
        data: billing,
      });
    } catch (error) {
      next(error);
    }
  };
