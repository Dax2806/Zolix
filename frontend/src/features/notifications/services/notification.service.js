import api from "../../../lib/api";

const unwrap = (res) =>
  res.data?.data ?? res.data;

export const getNotifications =
  async () => {
    const res = await api.get(
      "/notifications"
    );
    return unwrap(res);
  };

export const markAsRead =
  async (id) => {
    const res = await api.patch(
      `/notifications/${id}/read`
    );
    return unwrap(res);
  };
