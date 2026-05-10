import express from "express";
import authMiddleware from "../../common/middlewares/auth.middleware.js";
import authorize from "../../common/middlewares/authorize.middleware.js";
import tenantMiddleware from "../../common/middlewares/tenant.middleware.js";
import {
  getBilling,
  getPlans,
  updatePlan,
  createCheckoutSession
} from "./billing.controller.js";

const router = express.Router();

// Webhook is mounted in app.js because it requires raw body parser
// /api/billing/webhook

router.use(authMiddleware);
router.use(tenantMiddleware);

router.get("/plans", getPlans);
router.get("/", getBilling);

router.post(
  "/checkout",
  authorize("owner", "admin"),
  createCheckoutSession
);

// We keep updatePlan as a manual fallback or for free tier
router.patch(
  "/plan",
  authorize("owner", "admin"),
  updatePlan
);

export default router;
