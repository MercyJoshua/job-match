"use client"
import JobList from "@/components/JobList";
import user from "@/data/user";
import { useState } from "react";

export default function Dashboard() {
    const [userSkills] = useState<string[]>([]);


  return (
    <div className="p-6">
      <h1 className="text-3xl text-gray-600 font-bold">Welcome, {user.name}!</h1>
      <p className="text-gray-600">Find jobs that match your skills.</p>
      <JobList userSkills={userSkills} onSelectJob={(job) => console.log(job)} />
    </div>
  );
}
