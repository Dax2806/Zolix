import api from "../../../api/axios";

const unwrap = (response) =>
  response.data?.data ?? response.data;

export const getBilling =
  async () => {
    const response =
      await api.get("/billing");

    return unwrap(response);
  };

export const updatePlan =
  async (plan) => {
    const response =
      await api.patch(
        "/billing/plan",
        { plan }
      );

    return unwrap(response);
  };

export const createCheckoutSession = async (plan) => {
  const response = await api.post("/billing/checkout", { plan });
  return unwrap(response);
};
