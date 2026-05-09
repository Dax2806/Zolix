import {
  getDashboardStatsService,
} from "./dashboard.service.js";

import {
  successResponse,
} from "../../common/utils/apiResponse.js";

export const getDashboardStats =
  async (req, res, next) => {
    try {
      const stats =
        await getDashboardStatsService(
          req.user
        );

      return successResponse(res, {
        message:
          "Dashboard stats fetched successfully",

        data: stats,
      });
    } catch (error) {
      next(error);
    }
  };