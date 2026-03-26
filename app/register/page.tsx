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

  if (!username || !email || !password) {
    setError("All fields are required.");
    return;
  }

  try {
    const res = await api.post(
      "/auth/register/",
      {
        username,
        email,
        password,
      },
      {
        headers: {
          Authorization: undefined, // prevent token from being sent
        },
      }
    );

    setMessage("✅ Registration successful! Redirecting to login...");

    setTimeout(() => {
      router.push("/login");
    }, 1500);

  } catch (err: any) {
    const backendError = err?.response?.data;

    console.log("Register error:", backendError);

    if (backendError?.username) {
      setError(backendError.username[0]);
    } else if (backendError?.email) {
      setError(backendError.email[0]);
    } else if (backendError?.password) {
      setError(backendError.password[0]);
    } else {
      setError("Registration failed. Please try again.");
    }
  }
};

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

      <input
        className="w-full p-3 border rounded-xl mb-4"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="w-full p-3 border rounded-xl mb-4"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

      {message && (
        <p className="text-green-600 text-sm mb-3">
          {message}
        </p>
      )}

      <button
        onClick={register}
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
      >
        Register
      </button>
    </div>
  );
}