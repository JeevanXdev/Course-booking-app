import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center mt-16">
      <h1 className="text-4xl font-bold text-gray-800">
        Find Jobs & Courses Easily 🚀
      </h1>

      <p className="mt-4 text-gray-600">
        Browse listings, apply, enroll, and track everything from your dashboard.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/jobs"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Browse Jobs
        </Link>

        <Link
          href="/register"
          className="bg-gray-800 text-white px-6 py-3 rounded-xl"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
