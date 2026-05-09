import api from "../../../api/axios";

const unwrap = (response) =>
  response.data?.data ?? response.data;

export const getUsers = async () => {
  const response = await api.get(
    "/users"
  );

  return unwrap(response);
};

export const createUser = async (
  user
) => {
  const response = await api.post(
    "/users",
    user
  );

  return unwrap(response);
};

export const updateUser = async (
  id,
  data
) => {
  const response = await api.patch(
    `/users/${id}`,
    data
  );

  return unwrap(response);
};

export const deleteUser = async (
  id
) => {
  const response = await api.delete(
    `/users/${id}`
  );

  return unwrap(response);
};
