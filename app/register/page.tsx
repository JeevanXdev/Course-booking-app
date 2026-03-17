"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const register = async () => {
    setError("");
    setMessage("");

    try {
      await api.post("/auth/register/", {
        username,
        email,
        password,
      });

      setMessage("✅ Registration successful! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      console.error(err);

      setError("❌ Registration failed. Username may already exist.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <input
        className="w-full p-3 border rounded-xl mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="w-full p-3 border rounded-xl mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-3 border rounded-xl mb-3"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {message && <p className="text-green-600 mb-3">{message}</p>}

      <button
        onClick={register}
        className="w-full bg-blue-600 text-white py-3 rounded-xl mt-2"
      >
        Register
      </button>
    </div>
  );
}
