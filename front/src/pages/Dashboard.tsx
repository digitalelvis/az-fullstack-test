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
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          image={IconOrder}
          title="Total de Pedidos"
          value={loading ? "..." : dashboardData?.orders_count ?? 0}
        />
        <StatCard
          image={IconSales}
          title="Total de Vendas"
          value={loading ? "..." : `R$ ${dashboardData?.sales_total?.toFixed(2) ?? "0.00"}`}
        />
        <StatCard
          image={IconAverage}
          title="Ticket Médio"
          value={loading ? "..." : `R$ ${dashboardData?.average_ticket?.toFixed(2) ?? "0.00"}`}
        />
      </div>

      {/* DataTable - Últimos Pedidos */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Últimos Pedidos</h2>
        <DataTable orders={dashboardData?.orders ?? []} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
