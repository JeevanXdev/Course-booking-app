"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Application, Job } from "@/lib/types";
import { getToken } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const fetchData = async () => {
      try {
        const appsRes = await api.get("/applications/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const jobsRes = await api.get("/jobs/");

        setApplications(appsRes.data);
        setJobs(jobsRes.data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getJobTitle = (jobId: number) => {
    return jobs.find((j) => j.id === jobId)?.title || "Unknown Job";
  };

  return (
    <ProtectedRoute>
      <div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Applications</h1>

          <Link
            href="/jobs"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Browse Jobs
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-500">
            You haven't applied for any jobs yet.
          </p>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white p-5 rounded-xl shadow border"
              >
                <h2 className="text-xl font-bold">
                  {getJobTitle(app.job)}
                </h2>

                <p className="text-gray-500 mt-1">
                  Status:
                  <span className="font-semibold text-blue-600 ml-1">
                    {app.status}
                  </span>
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Applied: {new Date(app.applied_at).toDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}