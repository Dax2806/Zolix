import express from "express";
import authMiddleware from "../../common/middlewares/auth.middleware.js";
import authorize from "../../common/middlewares/authorize.middleware.js";
import tenantMiddleware from "../../common/middlewares/tenant.middleware.js";
import validate from "../../common/middlewares/validate.middleware.js";
import {
  createAutomation,
  deleteAutomation,
  getAutomations,
  updateAutomation,
} from "./automation.controller.js";
import {
  createAutomationSchema,
  updateAutomationSchema,
} from "./automation.validation.js";

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);
router.use(
  authorize(
    "owner",
    "admin",
    "manager"
  )
);

router.get("/", getAutomations);

router.post(
  "/",
  validate(createAutomationSchema),
  createAutomation
);

router.patch(
  "/:id",
  validate(updateAutomationSchema),
  updateAutomation
);

router.delete(
  "/:id",
  deleteAutomation
);

export default router;
