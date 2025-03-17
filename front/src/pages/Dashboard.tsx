import DashboardLayout from "../layout/DashboardLayout";
import { useAuthStore } from "../store/authStore";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold">Bem-vindo ao Dashboard</h1>
      <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      
    </div>
    </DashboardLayout>
  );
  
};

export default Dashboard;
