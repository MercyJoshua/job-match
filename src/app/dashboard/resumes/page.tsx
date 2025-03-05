"use client";
import ResumeList from "@/components/ResumeList";
import ResumeMatcher from "@/components/ResumeMatcher";
import ResumeUpload from "@/components/ResumeUpload";
import { useState, useEffect } from "react";

interface Resume {
  id: number;
  name: string;
  url: string;
  file?: File;
}

const ResumeManager = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [resumeSkills, setResumeSkills] = useState<string[]>([]);
  const [matchedJobs, setMatchedJobs] = useState<{ title: string; matchScore: number }[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
      setResumes(storedResumes);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resumes", JSON.stringify(resumes));
    }
  }, [resumes]);

  //  Send file to API for parsing
  const handleUpload = async (newResume: Resume) => {
    if (!newResume.file) return;

    const formData = new FormData();
    formData.append("file", newResume.file);

    try {
      // Send file to API for skill extraction
      const parseRes = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!parseRes.ok) throw new Error("Failed to parse resume.");
      const { skills } = await parseRes.json();
      setResumeSkills(skills);

      // Send extracted skills to API for job matching
      const matchRes = await fetch("/api/match-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills }),
      });

      if (!matchRes.ok) throw new Error("Failed to match jobs.");
      const { matches } = await matchRes.json();
      setMatchedJobs(matches);

      setResumes((prev) => [...prev, newResume]);
    } catch (error) {
      console.error("Error processing resume:", error);
    }
  };

  const handleDelete = (id: number) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id));
    setResumeSkills([]);
    setMatchedJobs([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-y-auto">
      <ResumeUpload onUpload={handleUpload} />
      <ResumeList resumes={resumes} onDelete={handleDelete} />
      <ResumeMatcher skills={resumeSkills} matchedJobs={matchedJobs} />
    
    </div>
  );
};

export default ResumeManager;
