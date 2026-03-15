import Link from "next/link";
import { Job } from "@/lib/types";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>

      <div className="flex gap-2 mt-2">
        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
          {job.category}
        </span>
        <span className="text-xs bg-blue-200 px-2 py-1 rounded-full">
          {job.job_type}
        </span>
      </div>

      <Link
        href={`/jobs/${job.id}`}
        className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg"
      >
        View Details
      </Link>
    </div>
  );
}
