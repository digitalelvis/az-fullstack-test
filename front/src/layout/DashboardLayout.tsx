import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-layout flex h-screen">
      {/* Menu lateral */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="main-content flex-1 flex flex-col bg-gray-50">
        {/* Barra superior */}
        <Topbar />

        {/* Container de conteúdo */}
        <div className="content-container flex-1 overflow-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
