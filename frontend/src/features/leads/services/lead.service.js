import api from "../../../api/axios";

const unwrap = (response) =>
  response.data?.data ?? response.data;

export const getLeads =
  async () => {
    const response =
      await api.get("/leads");

    const data = unwrap(response);

    return data.leads || data;
  };

export const createLead =
  async (data) => {
    const response =
      await api.post(
        "/leads",
        data
      );

    return unwrap(response);
  };

export const updateLeadStatus =
  async (
    leadId,
    status
  ) => {
    const response =
      await api.patch(
        `/leads/${leadId}/status`,
        { status }
      );

    return unwrap(response);
  };

export const addLeadNote =
  async (
    leadId,
    note
  ) => {
    const response =
      await api.post(
        `/leads/${leadId}/notes`,
        { note }
      );

    return unwrap(response);
  };

  export const addLeadTask =
  async (
    leadId,
    task
  ) => {
    const response =
      await api.post(
        `/leads/${leadId}/tasks`,
        task
      );

    return unwrap(response);
  };

export const toggleLeadTask =
  async (
    leadId,
    taskId
  ) => {
    const response =
      await api.patch(
        `/leads/${leadId}/tasks/${taskId}`
      );

    return unwrap(response);
  };

export const deleteLeadTask =
  async (
    leadId,
    taskId
  ) => {
    const response =
      await api.delete(
        `/leads/${leadId}/tasks/${taskId}`
      );

    return unwrap(response);
  };

export const getLeadActivities =
  async (leadId) => {
    const response =
      await api.get(
        `/activities/lead/${leadId}`
      );

    return unwrap(response);
  };

export const getLeadInsights =
  async (leadId) => {
    const response =
      await api.get(
        `/ai/leads/${leadId}/insights`
      );

    return unwrap(response);
  };
