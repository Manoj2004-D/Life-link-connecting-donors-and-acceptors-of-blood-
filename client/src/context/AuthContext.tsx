import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
type Role = "donor" | "recipient";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  bloodGroup?: string;
}

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  useEffect(() => {
    // keep axios default header in sync if desired (optional)
    const t = localStorage.getItem("token");
    if (t) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${t}`;
    }
  }, []);

  const login = (userData: User, tokenStr: string) => {
    setUser(userData);
    setToken(tokenStr);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenStr);
    // set default axios auth header if you want:
    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenStr}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
