import api from "./api";
import { DashboardData } from "../interfaces/dashboard";

export const fetchDashboardData = async (
  page: number = 1,
  limit: number = 100,
  start_date?: string,
  end_date?: string
): Promise<DashboardData> => {
  const response = await api.get("/proof/dashboard", {
    params: {
      page,
      limit,
      start_date,
      end_date,
    },
  });
  return response.data;
};
