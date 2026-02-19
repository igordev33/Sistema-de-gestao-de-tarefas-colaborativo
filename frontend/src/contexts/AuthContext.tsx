import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../api/axios";

interface User {
    email: string;
    name: string;
    admin: boolean;
}

interface AuthContextData {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

function decodeToken(token: string): User {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
        email: payload.sub,
        name: payload.name,
        admin: payload.admin,
    };
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return !!localStorage.getItem("accessToken");
    });

    const [user, setUser] = useState<User | null>(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            return decodeToken(token);
        }
        return null;
    });

    useEffect(() => {
        function handleLogout() {
            logout();
        }

        window.addEventListener("auth:logout", handleLogout);

        return () => {
            window.removeEventListener("auth:logout", handleLogout);
        };
    }, []);

    async function login(email: string, password: string) {
        const { data } = await api.post("/auth/login", {
            user_email: email,
            user_password: password
        });

        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);

        setUser(decodeToken(data.access_token));
        setIsAuthenticated(true);
    }

    function logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}