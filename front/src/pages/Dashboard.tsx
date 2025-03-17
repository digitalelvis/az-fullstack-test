import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import DashboardLayout from "../layout/DashboardLayout";
import { fetchDashboardData } from "../api/endpoints";
import DataTable from "../components/Tables/DataTable";
import IconOrder from "../assets/images/icons/icon-orders.png";
import IconSales from "../assets/images/icons/icon-sales.png";
import IconAverage from "../assets/images/icons/icon-average-ticket.png";
import { DashboardData } from "../interfaces/dashboard";

// obter o período padrão (início do mês até hoje)
const getDefaultDateRange = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear() - 5, today.getMonth(), 1);

  return {
    start_date: firstDayOfMonth.toISOString().split("T")[0], // YYYY-MM-DD
    end_date: today.toISOString().split("T")[0], // YYYY-MM-DD
  };
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [{ start_date, end_date }, setDateRange] = useState(getDefaultDateRange());

  useEffect(() => {
    const loadDashboardData = async () => {
      
      try {
        setLoading(true);
        const data = await fetchDashboardData(page, limit, start_date, end_date);
        console.log("Dados do dashboard:", data);
        setDashboardData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [page, limit, start_date, end_date]);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center">
        <h2 className="text-xl mb-4">Resumo dos pedidos</h2>
      
        {/* Filtro de Data */}
        <div className="mb-4 flex gap-4">
          <input
            type="date"
            value={start_date}
            onChange={(e) => setDateRange((prev) => ({ ...prev, start_date: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={end_date}
            onChange={(e) => setDateRange((prev) => ({ ...prev, end_date: e.target.value }))}
            className="border p-2 rounded"
          />
        </div>

    </div>
        
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

      {/* DataTable - Últimos Pedidos */}
      <div className="p-4">
        <DataTable
          orders={dashboardData?.orders ?? []}
          page={page}
          total_pages={dashboardData?.total_pages ?? 0}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
