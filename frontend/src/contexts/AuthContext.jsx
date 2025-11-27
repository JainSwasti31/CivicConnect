import { createContext, useEffect, useState } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("civic_user")) || null);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("civic_user", JSON.stringify(res.data.user));
    localStorage.setItem("civic_token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (name, email, password, role) => {
    const res = await api.post("/auth/register", { name, email, password, role });
    localStorage.setItem("civic_user", JSON.stringify(res.data.user));
    localStorage.setItem("civic_token", res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem("civic_user");
    localStorage.removeItem("civic_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
