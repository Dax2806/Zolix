import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import RegisterPage
  from "../pages/auth/RegisterPage";

import LoginPage
  from "../pages/auth/LoginPage";

import LeadsPage
  from "../features/leads/pages/LeadsPage";

import DashboardPage
  from "../pages/dashboard/DashboardPage";

import TasksPage
  from "../features/tasks/pages/TasksPage";

import TeamPage
  from "../features/team/pages/TeamPage";

import BillingPage
  from "../features/billing/pages/BillingPage";

import AutomationsPage
  from "../features/automations/pages/AutomationsPage";

import ProtectedRoute
  from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

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
              <TeamPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <BillingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/automations"
          element={
            <ProtectedRoute>
              <AutomationsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
