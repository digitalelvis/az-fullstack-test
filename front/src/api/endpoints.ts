import api from "./api";
import { DashboardData } from "../interfaces/dashboard";

export const fetchDashboardData = async (): Promise<DashboardData> => {
  const response = await api.get("/proof/dashboard");
  return response.data;
};
