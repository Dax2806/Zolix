export const PLAN_LIMITS = {
  free: {
    name: "Free",
    monthlyPrice: 0,
    leadLimit: 100,
    taskLimit: 100,
    userLimit: 2,
    aiInsights: true,
  },
  pro: {
    name: "Pro",
    monthlyPrice: 999,
    leadLimit: 1000,
    taskLimit: 1500,
    userLimit: 10,
    aiInsights: true,
  },
  business: {
    name: "Business",
    monthlyPrice: 2499,
    leadLimit: null,
    taskLimit: null,
    userLimit: null,
    aiInsights: true,
  },
};

export const getPlanConfig = (plan) =>
  PLAN_LIMITS[plan] ||
  PLAN_LIMITS.free;
