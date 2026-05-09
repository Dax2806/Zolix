import {
  CheckSquare,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
  Workflow,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Leads",
    path: "/leads",
    icon: Users,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Team",
    path: "/team",
    icon: Settings,
  },
  {
    title: "Billing",
    path: "/billing",
    icon: CreditCard,
  },
  {
    title: "Automations",
    path: "/automations",
    icon: Workflow,
  },
];
