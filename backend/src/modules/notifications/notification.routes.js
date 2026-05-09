import express from "express";

import authMiddleware from "../../common/middlewares/auth.middleware.js";
import tenantMiddleware from "../../common/middlewares/tenant.middleware.js";

import {
  getNotifications,
  markNotificationAsRead,
} from "./notification.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.get("/", getNotifications);

router.patch(
  "/:id/read",
  markNotificationAsRead
);

router.put(
  "/:id/read",
  markNotificationAsRead
);

export default router;
