import { create } from "zustand";
import { AuthState, User } from "../interfaces/authInterface";
import { config } from "../config/env";

// Função auxiliar para obter o usuário do localStorage com valores padrão
const getUserFromStorage = (): User | null => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;
  
  const parsedUser = JSON.parse(storedUser);
  
  // Adiciona valores padrão se não existirem
  return {
    ...parsedUser,
    currency: parsedUser.currency || config.defaultCurrency,
    locale: parsedUser.locale || config.defaultLocale
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getUserFromStorage(),
  
  setUser: (user: User) => {
    // Garante que currency e locale tenham valores padrão se não forem fornecidos
    const userWithDefaults: User = {
      ...user,
      currency: user.currency || config.defaultCurrency,
      locale: user.locale || config.defaultLocale
    };
    
    localStorage.setItem("user", JSON.stringify(userWithDefaults));
    set({ user: userWithDefaults });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  }
}));
