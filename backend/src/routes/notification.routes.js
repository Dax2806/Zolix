import express from "express";
import {
  createNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notification.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getNotifications
);

router.post(
  "/",
  protect,
  createNotification
);

router.patch(
  "/:id/read",
  protect,
  markAsRead
);

export default router;