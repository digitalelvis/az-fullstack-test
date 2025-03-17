import { Order } from "./orders";

  export interface DashboardData {
    orders_count: number;
    orders_total: number;
    sales_total: number;
    sales_count: number;
    average_ticket: number;
    orders: Order[];
    has_more: boolean;
    limit: number;
    page: number;
    total: number;
    total_pages: number;
  }
  