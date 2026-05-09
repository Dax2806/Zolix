import express from "express";

import authMiddleware from "../../common/middlewares/auth.middleware.js";
import tenantMiddleware from "../../common/middlewares/tenant.middleware.js";

import {
  getRecentActivities,
  getLeadActivities,
} from "./activity.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.get("/", getRecentActivities);

router.get(
  "/lead/:leadId",
  getLeadActivities
);

export default router;
