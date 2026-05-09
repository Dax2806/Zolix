import express from "express";

import authMiddleware from "../../common/middlewares/auth.middleware.js";
import tenantMiddleware from "../../common/middlewares/tenant.middleware.js";

import {
  getDashboardStats,
} from "./dashboard.controller.js";

import authorize from "../../common/middlewares/authorize.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.get(
  "/stats",

  authorize("owner", "admin"),

  getDashboardStats
);

export default router;
