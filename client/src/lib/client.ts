import axios from "axios";

const BASE_URL = "https://server.schedule24-7.link";

export const apiClient = () => {
  const accessToken = localStorage.getItem("token");

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return instance;
};
export default apiClient;
