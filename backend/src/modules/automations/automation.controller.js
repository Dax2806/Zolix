import {
  successResponse,
} from "../../common/utils/apiResponse.js";
import {
  createAutomationService,
  deleteAutomationService,
  getAutomationsService,
  updateAutomationService,
} from "./automation.service.js";

export const getAutomations =
  async (req, res, next) => {
    try {
      const automations =
        await getAutomationsService(
          req.user
        );

      return successResponse(res, {
        message:
          "Automations fetched successfully",
        data: automations,
      });
    } catch (error) {
      next(error);
    }
  };

export const createAutomation =
  async (req, res, next) => {
    try {
      const automation =
        await createAutomationService(
          req.body,
          req.user
        );

      return successResponse(res, {
        statusCode: 201,
        message:
          "Automation created successfully",
        data: automation,
      });
    } catch (error) {
      next(error);
    }
  };

export const updateAutomation =
  async (req, res, next) => {
    try {
      const automation =
        await updateAutomationService(
          req.params.id,
          req.body,
          req.user
        );

      return successResponse(res, {
        message:
          "Automation updated successfully",
        data: automation,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteAutomation =
  async (req, res, next) => {
    try {
      const result =
        await deleteAutomationService(
          req.params.id,
          req.user
        );

      return successResponse(res, {
        message:
          "Automation deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
