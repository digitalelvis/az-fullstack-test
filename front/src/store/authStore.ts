import { create } from "zustand";

// Interface para representar o estado de autenticação com os dados do usuário
interface AuthState {
  user: {
    token: string | null;
    name: string | null;
    email: string | null;
    id: string | null;
  };
  setUser: (user: {
    token: string | null;
    name: string | null;
    email: string | null;
    id: string | null;
  }) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    token: localStorage.getItem("token"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    id: localStorage.getItem("id"),
  },
  setUser: (user) => {
    // Armazenar os dados no localStorage
    if (user.token) localStorage.setItem("token", user.token);
    if (user.name) localStorage.setItem("name", user.name);
    if (user.email) localStorage.setItem("email", user.email);
    if (user.id) localStorage.setItem("id", user.id);

    set({ user });
  },
}));
