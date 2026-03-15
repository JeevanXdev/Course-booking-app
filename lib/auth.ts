"use client";

import { setAuthToken } from "./api";

export const saveToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access", token);
    setAuthToken(token);
  }
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access");
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access");
    setAuthToken(null);
  }
};
