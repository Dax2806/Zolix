import axios
  from "../api/axios";

export const registerUser =
  async (data) => {
    try {
      const response =
        await axios.post(
          "/auth/register",
          data
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Registration failed",
        }
      );
    }
  };

export const loginUser =
  async (data) => {
    try {
      const response =
        await axios.post(
          "/auth/login",
          data
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data ||
        {
          message:
            "Login failed",
        }
      );
    }
  };

export const getInviteDetails = async (token) => {
  try {
    const response = await axios.get(`/users/invite/${token}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch invite details" };
  }
};

export const acceptInvite = async (token, data) => {
  try {
    const response = await axios.post(`/users/invite/${token}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to accept invite" };
  }
};