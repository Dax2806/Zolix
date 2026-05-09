import express from "express";
import authMiddleware from "../../common/middlewares/auth.middleware.js";
import tenantMiddleware from "../../common/middlewares/tenant.middleware.js";
import planLimit from "../../common/middlewares/planLimit.middleware.js";
import {
  addLeadNote,
  addTask,
  createLead,
  deleteLead,
  deleteTask,
  getLeadById,
  getLeads,
  toggleTask,
  updateLead,
  updateLeadStatus,
} from "./lead.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.post(
  "/",
  planLimit("leads"),
  createLead
);
router.get("/", getLeads);
router.get("/:id", getLeadById);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

router.patch(
  "/:id/status",
  updateLeadStatus
);

router.post("/:id/notes", addLeadNote);
router.post("/:id/tasks", addTask);

router.patch(
  "/:leadId/tasks/:taskId",
  toggleTask
);

router.delete(
  "/:leadId/tasks/:taskId",
  deleteTask
);

export default router;
