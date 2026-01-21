"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { loginWithEmployeeId } from "@/lib/api/auth";
import {
  saveAuthData,
  getAuthData,
  clearAuthData,
  updateVoteCount,
  getVoteCount,
  isAuthenticated as checkAuth,
  type AuthData,
} from "@/lib/storage";

interface AuthContextType {
  isAuthenticated: boolean;
  employeeId: string | null;
  dailyVoteRemaining: number;
  login: (employeeId: string) => Promise<void>;
  logout: () => void;
  decrementVote: (count?: number) => void;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [dailyVoteRemaining, setDailyVoteRemaining] = useState(0);

  // Load auth data from localStorage on mount và check ngày mới
  useEffect(() => {
    checkAndRefreshAuth();
  }, []);

  const checkAndRefreshAuth = () => {
    const authData = getAuthData();

    if (authData && checkAuth()) {
      // Kiểm tra xem có phải ngày mới không
      const lastLoginDate = new Date(authData.lastLogin);
      const today = new Date();

      // So sánh ngày (bỏ qua giờ phút giây)
      const isSameDay =
        lastLoginDate.getFullYear() === today.getFullYear() &&
        lastLoginDate.getMonth() === today.getMonth() &&
        lastLoginDate.getDate() === today.getDate();

      if (!isSameDay) {
        // Ngày mới -> Logout và xóa localStorage
        console.log("Ngày mới phát hiện, đang đăng xuất...");
        clearAuthData();
        setIsAuthenticated(false);
        setEmployeeId(null);
        setDailyVoteRemaining(0);
        return;
      }

      // Cùng ngày -> Load auth data
      setIsAuthenticated(true);
      setEmployeeId(authData.employeeId);
      setDailyVoteRemaining(authData.dailyVoteRemaining);
    } else {
      setIsAuthenticated(false);
      setEmployeeId(null);
      setDailyVoteRemaining(0);
    }
  };

  const refreshAuth = () => {
    checkAndRefreshAuth();
  };

  const login = async (empId: string) => {
    try {
      const response = await loginWithEmployeeId(empId);

      if (response.success) {
        const authData: AuthData = {
          employeeId: empId,
          dailyVoteRemaining: response.dailyVoteRemaining,
          lastLogin: new Date().toISOString(),
        };

        saveAuthData(authData);
        setIsAuthenticated(true);
        setEmployeeId(empId);
        setDailyVoteRemaining(response.dailyVoteRemaining);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    clearAuthData();
    setIsAuthenticated(false);
    setEmployeeId(null);
    setDailyVoteRemaining(0);
  };

  const decrementVote = (count: number = 1) => {
    const newCount = Math.max(0, dailyVoteRemaining - count);
    setDailyVoteRemaining(newCount);
    updateVoteCount(newCount);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        employeeId,
        dailyVoteRemaining,
        login,
        logout,
        decrementVote,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
