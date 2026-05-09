import Notification from "./notification.model.js";

import {
  successResponse,
} from "../../common/utils/apiResponse.js";

export const getNotifications =
  async (req, res, next) => {
    try {
      const notifications =
        await Notification.find({
          tenantId:
            req.user.tenantId,

          userId: req.user.id,
        })
          .sort({
            createdAt: -1,
          })
          .limit(20);

      return successResponse(res, {
        message:
          "Notifications fetched successfully",

        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  };

export const markNotificationAsRead =
  async (req, res, next) => {
    try {
      const notification =
        await Notification.findOneAndUpdate(
          {
            _id: req.params.id,
            tenantId: req.user.tenantId,
            userId: req.user.id,
          },
          {
            isRead: true,
          },
          {
            new: true,
          }
        );

      if (!notification) {
        return res.status(404).json({
          message:
            "Notification not found",
        });
      }

      return successResponse(res, {
        message:
          "Notification marked as read",
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  };
