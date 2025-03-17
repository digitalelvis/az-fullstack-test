import api from "./api";

export const fetchDashboardData = async (token: string) => {
  const response = await api.get("/proof/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
