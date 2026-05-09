import {
  getActivitiesService,
} from "./activity.service.js";

import {
  successResponse,
} from "../../common/utils/apiResponse.js";

export const getRecentActivities =
  async (req, res, next) => {
    try {
      const activities =
        await getActivitiesService(
          {
            tenantId: req.user.tenantId,
          },
          req.query.limit || 20
        );

      return successResponse(res, {
        message:
          "Activities fetched successfully",

        data: activities,
      });
    } catch (error) {
      next(error);
    }
  };

export const getLeadActivities =
  async (req, res, next) => {
    try {
      const activities =
        await getActivitiesService(
          {
            tenantId: req.user.tenantId,
            entityType: "lead",
            entityId: req.params.leadId,
          },
          req.query.limit || 50
        );

      return successResponse(res, {
        message:
          "Lead activities fetched successfully",
        data: activities,
      });
    } catch (error) {
      next(error);
    }
  };
