import api from "../../../api/axios";

const unwrap = (response) =>
  response.data?.data ?? response.data;

export const getTasks = async (
  params = {}
) => {
  const response = await api.get(
    "/tasks",
    { params }
  );

  const data = unwrap(response);

  return data.tasks || data;
};

export const createTask = async (
  task
) => {
  const response = await api.post(
    "/tasks",
    task
  );

  return unwrap(response);
};

export const updateTask = async (
  id,
  data
) => {
  const response = await api.put(
    `/tasks/${id}`,
    data
  );

  return unwrap(response);
};

export const deleteTask = async (
  id
) => {
  const response = await api.delete(
    `/tasks/${id}`
  );

  return unwrap(response);
};
