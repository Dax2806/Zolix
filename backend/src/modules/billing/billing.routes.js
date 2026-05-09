import express from "express";
import authMiddleware from "../../common/middlewares/auth.middleware.js";
import authorize from "../../common/middlewares/authorize.middleware.js";
import tenantMiddleware from "../../common/middlewares/tenant.middleware.js";
import {
  getBilling,
  getPlans,
  updatePlan,
} from "./billing.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.get("/plans", getPlans);
router.get("/", getBilling);

router.patch(
  "/plan",
  authorize("owner", "admin"),
  updatePlan
);

export default router;
