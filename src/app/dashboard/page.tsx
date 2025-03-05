"use client";
import { useState } from "react";
import JobList from "@/components/JobList";
import { Job } from "@/types/types"; // Job type
import JobModal from "@/components/JobModal";

export default function Dashboard() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <JobList onSelectJob={setSelectedJob} userSkills={[]} />
      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
}
