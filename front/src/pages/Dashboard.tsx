import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuthStore } from "../store/auth";
import { fetchDashboardData } from "../api/endpoints";
import DataTable from "../components/Tables/DataTable";

import IconOrder from "../assets/images/icons/icon-orders.png";
import IconSales from "../assets/images/icons/icon-sales.png";
import IconAverage from "../assets/images/icons/icon-average-ticket.png";
import { DashboardData } from "../interfaces/dashboard";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  return (
    <DashboardLayout>
    <h2 className="text-xl mb-4">Resumo dos pedidos</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          image={IconOrder}
          
          title={loading ? "..." : `${dashboardData?.orders_count} Pedidos`}
          value={loading ? "..." : `R$ ${dashboardData?.orders_total?.toFixed(2) ?? "0.00"}`}
        />
        <StatCard
          image={IconSales}
          title={loading ? "..." : `${dashboardData?.sales_count} Vendas`}
          value={loading ? "..." : `R$ ${dashboardData?.sales_total?.toFixed(2) ?? "0.00"}`}
        />
        <StatCard
          image={IconAverage}
          title="Ticket Médio"
          value={loading ? "..." : `R$ ${dashboardData?.average_ticket?.toFixed(2) ?? "0.00"}`}
        />
      </div>

      {/* Últimos Pedidos */}
      <DataTable orders={dashboardData?.orders ?? []} />

    </DashboardLayout>
  );
};

export default Dashboard;
