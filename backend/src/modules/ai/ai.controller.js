import {
  successResponse,
} from "../../common/utils/apiResponse.js";
import {
  getLeadInsightsService,
} from "./ai.service.js";

export const getLeadInsights =
  async (req, res, next) => {
    try {
      const insights =
        await getLeadInsightsService(
          req.params.leadId,
          req.user
        );

      return successResponse(res, {
        message:
          "Lead insights generated successfully",
        data: insights,
      });
    } catch (error) {
      next(error);
    }
  };
