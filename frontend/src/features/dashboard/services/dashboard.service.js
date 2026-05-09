import api from "../../../lib/api";

export const getDashboardStats =
  async () => {
    const res = await api.get(
      "/analytics/dashboard"
    );

    return res.data;
  };