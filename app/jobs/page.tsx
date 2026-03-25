"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Job } from "@/lib/types";
import JobCard from "@/components/jobcard";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/jobs/")
      .then((res) => {
        // If API returns paginated data like { results: [...] }
        if (Array.isArray(res.data)) {
          setJobs(res.data);
        } else if (res.data.results && Array.isArray(res.data.results)) {
          setJobs(res.data.results);
        } else {
          console.error("Unexpected jobs response format:", res.data);
          setJobs([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setJobs([]);
      });
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      <input
        type="text"
        placeholder="Search job title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl border mb-6"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-gray-500">No jobs found.</p>
        )}
      </div>
    </div>
  );
}
