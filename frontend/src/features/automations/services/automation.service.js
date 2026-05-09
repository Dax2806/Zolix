import api from "../../../api/axios";

const unwrap = (response) =>
  response.data?.data ?? response.data;

export const getAutomations =
  async () => {
    const response =
      await api.get("/automations");

    return unwrap(response);
  };

export const createAutomation =
  async (automation) => {
    const response =
      await api.post(
        "/automations",
        automation
      );

    return unwrap(response);
  };

export const updateAutomation =
  async (id, data) => {
    const response =
      await api.patch(
        `/automations/${id}`,
        data
      );

    return unwrap(response);
  };

export const deleteAutomation =
  async (id) => {
    const response =
      await api.delete(
        `/automations/${id}`
      );

    return unwrap(response);
  };
