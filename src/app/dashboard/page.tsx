'use client';

import { useEffect, useState } from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  score: number;
  match_explanation: string;
}

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('http://localhost:8000/jobs/search?user_id=123&resume_id=456');  // Placeholder IDs
      const data = await res.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Job Matches</h1>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-600">{job.company} - {job.location}</p>
            <p className="text-green-600">Score: {job.score.toFixed(2)}</p>
            <p className="text-sm">{job.match_explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}