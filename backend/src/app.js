import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import leadRoutes from "./modules/leads/lead.route.js";
import errorMiddleware from "./common/middlewares/error.middleware.js";
import taskRoutes from "./modules/tasks/task.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import activityRoutes from "./modules/activity/activity.routes.js";
import notificationRoutes from "./modules/notifications/notification.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import aiRoutes from "./modules/ai/ai.routes.js";
import billingRoutes from "./modules/billing/billing.routes.js";
import automationRoutes from "./modules/automations/automation.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/tasks", taskRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/activities",
  activityRoutes
);
app.use(
  "/api/notifications",
  notificationRoutes
);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/billing", billingRoutes);
app.use(
  "/api/automations",
  automationRoutes
);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Zolix API Running",
  });
});

app.use(errorMiddleware);

export default app;
