import Notification from "./notification.model.js";
import {
  emitNotification,
} from "../../socket/socket.service.js";

export const createNotification =
  async ({
    tenantId,
    userId,
    type,
    title,
    message,
    entityType,
    entityId,
  }) => {
    const notification =
  await Notification.create({
    tenantId,
    userId,
    type,
    title,
    message,
    entityType,
    entityId,
  });

emitNotification(
  userId.toString(),
  notification
);

return notification;
  };