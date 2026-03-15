"use client";

import Link from "next/link";
import { logout, getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function Navbar() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);

    if (storedToken) {
      api.get("/auth/me/")
        .then((res) => {
          setUsername(res.data.username);
        })
        .catch(() => {
          console.log("Failed to fetch user info");
        });
    }
  }, []);

  const handleLogout = () => {
    logout();
    setToken(null);
    router.push("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        JobCourseApp
      </Link>

      <div className="flex gap-5 items-center">

        <Link href="/jobs" className="hover:text-blue-600">
          Browse Jobs
        </Link>

        {token ? (
          <>
            <Link
              href="/dashboard"
              className="font-semibold text-gray-700 hover:text-blue-600"
            >
              {username}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>

            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}