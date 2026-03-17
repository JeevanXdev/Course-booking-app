"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Job } from "@/lib/types";
import { getToken } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/jobs/")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  const createJob = async () => {
    const token = getToken();
    if (!token) return;

    if (!title.trim()) {
      alert("Please enter a job title!");
      return;
    }

    try {
      const res = await api.post(
        "/jobs/",
        {
          title,
          company: "Demo Company",
          location: "Remote",
          job_type: "Full-time",
          description: "Job description here",
          salary: "$5000",
          category: "Tech",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setJobs([res.data, ...jobs]);
      setTitle("");
    } catch (error) {
      console.error("Error creating job:", error);
      alert("❌ Failed to create job. Only Admin users can do this.");
    }
  };

  return (
    <ProtectedRoute adminOnly={true}>
      <div>
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="bg-white p-5 rounded-xl shadow border mb-6">
          <h2 className="text-xl font-bold mb-3">Create Job</h2>

          <input
            className="w-full p-3 border rounded-xl"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={createJob}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Add Job
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">All Jobs</h2>

        {loading ? (
          <p className="text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 rounded-xl shadow border"
              >
                <h3 className="font-bold text-lg">{job.title}</h3>
                <p className="text-gray-500">{job.company}</p>
                <p className="text-sm text-gray-400">{job.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
