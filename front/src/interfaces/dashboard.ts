export interface DashboardOrder {
    _id: string;
    customer: { name: string };
    createdAt: string;
    status: string;
    payment: { amount: number; method: string };
  }
  
  export interface DashboardData {
    orders_count: number;
    sales_total: number;
    average_ticket: number;
    orders: DashboardOrder[];
  }
  