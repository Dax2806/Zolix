import {
  CheckSquare,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
  Workflow,
  User,
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
    title: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    title: "Team",
    path: "/team",
    icon: Settings,
    allowedRoles: ["owner", "admin"],
  },
  {
    title: "Billing",
    path: "/billing",
    icon: CreditCard,
    allowedRoles: ["owner", "admin"],
  },
  {
    title: "Automations",
    path: "/automations",
    icon: Workflow,
    allowedRoles: ["owner", "admin", "manager"],
  },
];
