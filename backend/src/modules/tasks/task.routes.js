import express from "express";

import authMiddleware from "../../common/middlewares/auth.middleware.js";
import tenantMiddleware from "../../common/middlewares/tenant.middleware.js";
import planLimit from "../../common/middlewares/planLimit.middleware.js";

import validate from "../../common/middlewares/validate.middleware.js";

import authorize from "../../common/middlewares/authorize.middleware.js";

import {
  createTaskSchema,
} from "./task.validation.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./task.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.post(
  "/",
  planLimit("tasks"),
  validate(createTaskSchema),
  createTask
);

router.get("/", getTasks);

router.put("/:id", updateTask);

router.delete(
  "/:id",

  authorize("owner", "admin"),

  deleteTask
);

export default router;
