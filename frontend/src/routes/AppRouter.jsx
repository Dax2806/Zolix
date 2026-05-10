import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import AcceptInvitePage from "../pages/auth/AcceptInvitePage";
import LeadsPage from "../features/leads/pages/LeadsPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import TasksPage from "../features/tasks/pages/TasksPage";
import TeamPage from "../features/team/pages/TeamPage";
import BillingPage from "../features/billing/pages/BillingPage";
import AutomationsPage from "../features/automations/pages/AutomationsPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleGuard from "../components/RoleGuard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/invite/:token" element={<AcceptInvitePage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <LeadsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["owner", "admin"]}>
                <TeamPage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["owner", "admin"]}>
                <BillingPage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/automations"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["owner", "admin", "manager"]}>
                <AutomationsPage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
