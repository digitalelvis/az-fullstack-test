import React, { useState } from "react";
import { logout } from "../utils/logout";  // Importando a função de logout
import { useAuthStore } from "../store/authStore";  // Acessando o estado de autenticação
import Avatar from "./Avatar";

const Topbar = () => {
  const { user, setUser } = useAuthStore();  // Acessando os dados do usuário e setUser
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // Controle do dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Alterna o estado do dropdown
  };

  if (!user || !user.name) return null;  // Se não houver usuário, não renderiza o Topbar

  const avatarInitials = user.name.split(" ").map((name) => name[0]).join("");  // Inicial do nome

  return (
    <div className="topbar bg-white shadow-md p-4 flex justify-between items-center">
      <div className="notifications">
        <button className="text-gray-600">
          <i className="fas fa-bell"></i> {/* Ícone de notificação */}
        </button>
      </div>
      <div className="user-info flex items-center space-x-4">
        <span>Olá, {user.name}</span>
        <div className="relative">
          {/* Avatar e nome do usuário */}
          <Avatar initials={avatarInitials} onClick={toggleDropdown} />
          {/* Dropdown de opções */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
              <ul>
                <li className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100">Meu Perfil</li>
                <li className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100">Configurações</li>
                <li
                  className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => logout(setUser)}  // Passando setUser para a função de logout
                >
                  Sair
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
