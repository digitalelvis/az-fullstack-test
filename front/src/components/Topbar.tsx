import React, { useState } from "react";
import { useAuthStore } from "../store/auth";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Logo from "./Logo";

const Topbar = () => {
  const { user, logout: authLogout } = useAuthStore(); // Use the logout function from the store
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogout = () => {
    authLogout(); // Call the logout function from the store
    navigate("/login"); // Redirect using useNavigate
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Verificação de segurança para garantir que o usuário existe
  if (!user) return null;

  const userName = user.profile?.name || 'Nome do Cliente';
  const avatarInitials = userName
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <div className="topbar bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="logo mb-8 md:hidden">
        <Logo size="md" />
      </div>
        <div className="notifications">
          <button className="text-gray-600">
            <i className="fas fa-bell"></i>
          </button>
        </div>

      <div className="flex items-end gap-3 cursor-pointer" onClick={toggleDropdown}>
        <div className="user-info flex-row items-start">
          <div>Olá,</div>
          <div className="font-bold">{userName}</div>
        </div>

        <div className="relative">
              <Avatar initials={avatarInitials} />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                  <ul>
                    <li
                      className="px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-100"
                      onClick={handleLogout}
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
