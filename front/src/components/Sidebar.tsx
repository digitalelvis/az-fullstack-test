import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-800 text-white w-64 h-full p-4">
      <div className="logo mb-8">
        <h2 className="text-2xl font-semibold">Seu Logo</h2>
      </div>
      <nav>
        <ul>
          <li><Link to="/dashboard" className="block py-2">Dashboard</Link></li>
          <li><Link to="/profile" className="block py-2">Perfil</Link></li>
          <li><Link to="/settings" className="block py-2">Configurações</Link></li>
          {/* Adicione mais links conforme necessário */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
