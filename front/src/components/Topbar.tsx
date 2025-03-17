import React from "react";
import Avatar from "./Avatar";

const Topbar = () => {
  const userName = "Usuário Teste";  // Isso pode vir do estado global (como a store)
  const avatarInitials = userName.split(" ").map((name) => name[0]).join("");

  return (
    <div className="topbar bg-white shadow-md p-4 flex justify-between items-center">
      <div className="notifications">
        <button className="text-gray-600">
          <i className="fas fa-bell"></i> {/* Ícone de notificação */}
        </button>
      </div>
      <div className="user-info flex items-center space-x-4">
        <span>Olá, {userName}</span>
        <Avatar initials={avatarInitials} />
      </div>
    </div>
  );
};

export default Topbar;
