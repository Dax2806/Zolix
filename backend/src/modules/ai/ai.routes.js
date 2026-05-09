import express from "express";
import authMiddleware from "../../common/middlewares/auth.middleware.js";
import tenantMiddleware from "../../common/middlewares/tenant.middleware.js";
import {
  getLeadInsights,
} from "./ai.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.get(
  "/leads/:leadId/insights",
  getLeadInsights
);

export default router;
