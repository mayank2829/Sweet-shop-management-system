import React, { createContext, useContext, useState, ReactNode } from "react";
import { loginRequest, registerRequest } from "@/api/auth";
import { User } from "@/types/sweet";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🔐 LOGIN (REAL BACKEND)
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await loginRequest(email, password);

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Set user (basic info for UI)
      setUser({
        _id: "temp-id",
        email,
        name: email.split("@")[0],
        role: email.toLowerCase().includes("admin") ? "admin" : "user",
      });

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // 📝 REGISTER (REAL BACKEND)
  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    try {
      await registerRequest(email, password);
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
