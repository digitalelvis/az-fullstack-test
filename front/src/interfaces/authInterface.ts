export interface Profile {
  name: string | null;
}
export interface User {
    token: string | null;
    email: string | null;
    id: string | null;
    profile: Profile | null;
    currency: string;
    locale: string;
}
export interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}
export interface ProofSession {
  email: string;
  password: string;
}