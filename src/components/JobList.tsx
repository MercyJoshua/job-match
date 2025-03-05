"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Job } from "@/types/types";


interface JobListProps {
  onSelectJob: (job: Job) => void;
  userSkills: string[];
}

const JobList: React.FC<JobListProps> = ({ onSelectJob }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; // Show 5 jobs per page

  useEffect(() => {
    axios.get("/api/jobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Failed to fetch jobs:", error));
  }, []);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(jobs.length / jobsPerPage)));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl text-black font-semibold mb-4">Recommended Jobs</h2>

      {/* Job Table */}
      <table className="w-full text-gray-600 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2 text-left">Company</th>
            <th className="border p-2 text-left">Location</th>
            <th className="border p-2 text-left">Salary</th>
            <th className="border p-2 text-center">Match Score</th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.map((job) => (
            <tr 
              key={job.id} 
              className="border cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectJob(job)}
            >
              <td className="border p-2">{job.title}</td>
              <td className="border p-2">{job.company}</td>
              <td className="border p-2">{job.location}</td>
              <td className="border p-2">{job.salary}</td>
              <td className="border p-2 text-center">
                <span 
                  className={`px-2 py-1 rounded text-white inline-block ${
                    job.matchScore >= 80 ? "bg-green-500" 
                    : job.matchScore >= 50 ? "bg-yellow-500" 
                    : "bg-red-500"
                  }`}
                >
                  {job.matchScore}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button 
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage} of {Math.ceil(jobs.length / jobsPerPage)}</span>
        <button 
          className={`px-4 py-2 rounded ${currentPage === Math.ceil(jobs.length / jobsPerPage) ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          onClick={nextPage}
          disabled={currentPage === Math.ceil(jobs.length / jobsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobList;
