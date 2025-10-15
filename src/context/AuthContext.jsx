import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoadingAuth(false);
      return;
    }

    api.get("/auth/profile")
      .then(res => {
        setUser(res.data);
      })
      .catch(async () => {
        try {
          const res2 = await api.get("/users");
        } catch (e) {}
      })
      .finally(() => setLoadingAuth(false));
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    const data = res.data;
    let token = null;
    if (typeof data === "string") {
      token = data;
    } else if (data?.token) {
      token = data.token;
    } else if (data?.accessToken) {
      token = data.accessToken;
    }
    if (token) {
      localStorage.setItem("token", token);
      try {
        const profile = (await api.get("/auth/profile")).data;
        setUser(profile);
      } catch {
        if (data?.user) setUser(data.user);
        else setUser(null);
      }
    } else {
      if (data?.user) setUser(data.user);
    }
    return res;
  };

  const register = async (payload) => {
    return await api.post("/auth/register", payload);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
