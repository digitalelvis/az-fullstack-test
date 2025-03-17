import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import iconDashboard from "../assets/images/icons/icon-sidebar-dashboard.png";
const Sidebar = () => {
  const location = useLocation(); // Obtém a rota atual

  return (
    <div className="bg-white shadow-xl w-80 h-full p-4 hidden md:block">
      <div className="logo mb-8">
        <Logo size="md" />
      </div>
      <nav>
        <ul>
          <li>
            <Link
              to="/dashboard"
              className={`py-5 px-4 rounded-xl flex flex-row gap-4 justify-items-stretch items-center  ${
                location.pathname === "/dashboard" ? "bg-primary text-white" : "text-gray-700"
              }`}
            >
              <img src={iconDashboard} alt="Logo" className="w-6" /> Dashboard
            </Link>
          </li>
          {/* Adicione mais links aqui */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
