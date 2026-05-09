import express from "express";
import { getDashboardStats } from "../controllers/analytics.controller.js";
import authMiddleware from "../common/middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  getDashboardStats
);

export default router;
