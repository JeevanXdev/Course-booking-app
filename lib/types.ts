export interface User {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  job_type: string;
  description: string;
  salary: string;
  category: string;
  created_at: string;
}

export interface Application {
  id: number;
  job: number;
  user: number;
  cover_letter: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  applied_at: string;
}
