"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Job } from "@/lib/types";
import { useParams } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function JobDetailPage() {
  const params = useParams();
  const id = params.id;

  const [job, setJob] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}/`).then((res) => setJob(res.data));
  }, [id]);

  const apply = async () => {
    const token = getToken();
    if (!token) {
      setMessage("❌ Please login first.");
      return;
    }

    try {
      await api.post(
        "/applications/",
        { job: job?.id, cover_letter: coverLetter },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Application submitted successfully!");
    } catch (err) {
      setMessage("❌ You may have already applied.");
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-500">{job.location}</p>

      <p className="mt-4">{job.description}</p>

      <textarea
        placeholder="Cover letter (optional)"
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        className="w-full border rounded-xl p-3 mt-6"
      />

      <button
        onClick={apply}
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Apply Now
      </button>

      {message && <p className="mt-4 font-semibold">{message}</p>}
    </div>
  );
}
