"use client"
import JobList from "@/components/JobList";
import ResumeUpload from "@/components/ResumeUpload";
import user from "@/data/user";
import { Resume } from "@/types/types";
import { useState } from "react";

export default function Dashboard() {
    const [userSkills, setUserSkills] = useState<string[]>([]);

    const handleResumeUpload = (_resume: Resume, skills: string[]) => {
      setUserSkills(skills);
    };
  return (
    <div className="p-6">
      <h1 className="text-3xl text-gray-600 font-bold">Welcome, {user.name}!</h1>
      <p className="text-gray-600">Find jobs that match your skills.</p>
      <ResumeUpload onUpload={handleResumeUpload} />
      <JobList userSkills={userSkills} onSelectJob={(job) => console.log(job)} />
    </div>
  );
}
