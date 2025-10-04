import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthSessionType = {
    token: string;
    setToken: (novoToken: string) => void;
    clearToken: () => void;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    login: (token: string, user: User) => void;
    logout: () => void;
}


// Usuário de mock para simular o login
const MOCK_USER: User = {
    _id: "dev-id-12345",
    name: "Usuário Dev",
    email: "dev@example.com",
    phone: "11999999999",
    city: "São Paulo",
    state: "SP",
};

export const useAuthSessionStore = create<AuthSessionType>()(
    persist(
        (set) => ({
            token: "",
            setToken: (novoToken) => set((state) => ({ ...state, token: novoToken })),
            clearToken: () => set((state) => ({ ...state, token: "" })),
            isAuthenticated: true,
        }),
        {
            name: "@auth-session-store",
        }
    )
);




