"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { saveToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { refreshUser } = useAuth();

  const login = async () => {
    setError("");

    try {
      const res = await api.post("/auth/login/", {
        username,
        password,
      });

      // Save JWT token
      saveToken(res.data.access);

      // Refresh global auth state
      await refreshUser();

      // Redirect to dashboard
      router.push("/dashboard");

    } catch (err) {
      setError("Invalid username or password. Maybe you have not registerd yet? Please register first.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <input
        className="w-full p-3 border rounded-xl mb-4"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="w-full p-3 border rounded-xl mb-4"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p className="text-red-500 text-sm mb-3">
          {error}
        </p>
      )}

      <button
        onClick={login}
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}