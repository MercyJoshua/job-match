"use client";

import { useState } from "react";
import { Job } from "@/types/types";
import { IoArrowBack, IoArrowForward, IoClose } from "react-icons/io5";

// Sample list of predefined skills (can be fetched from an API)
const skillOptions = [
  "JavaScript", "TypeScript", "React", "Vue", "Node.js",
  "Express", "NestJS", "Python", "Django", "PostgreSQL",
  "MySQL", "AWS", "Docker", "Git", "CSS", "HTML",
  "Angular", "Svelte", "Next.js", "GraphQL", "REST API",
  "MongoDB", "Firebase", "Kubernetes", "Terraform", "Jenkins",
  "CI/CD", "Azure", "Google Cloud Platform (GCP)", "Machine Learning",
  "Data Science", "TensorFlow", "PyTorch", "Pandas", "NumPy",
  "Flask", "FastAPI", "Ruby on Rails", "Java", "Spring Boot",
  "Kotlin", "Swift", "iOS Development", "Android Development",
  "Flutter", "React Native", "Redux", "SASS", "Tailwind CSS",
  "Webpack", "Babel", "Elasticsearch", "Redis", "RabbitMQ",
  "Kafka", "Microservices", "Serverless Architecture", "Blockchain",
  "Solidity", "Ethereum", "Smart Contracts", "DevOps", "Linux",
  "Bash Scripting", "PowerShell", "Agile Methodology", "Scrum",
  "Jira", "Confluence", "Figma", "UI/UX Design", "Cybersecurity",
  "Penetration Testing", "Ethical Hacking", "Cloud Security",
  "Network Security", "Data Engineering", "Big Data",
];

interface JobModalProps {
  job: Job;
  onClose: () => void;
}

const JobModal = ({ job, onClose }: JobModalProps) => {
  const [step, setStep] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [visibleSkills, setVisibleSkills] = useState(10);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  // Handle skill selection
  const handleSkillChange = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Load more skills
  const loadMoreSkills = () => setVisibleSkills((prev) => prev + 10);

  // Calculate match score
  const calculateMatchScore = () => {
    if (!selectedSkills.length || !job.requiredSkills.length) {
      setMatchScore(0);
      return;
    }

    const requiredSkills = job.requiredSkills.map((skill) => skill.toLowerCase());
    const matchedSkills = selectedSkills.filter((skill) =>
      requiredSkills.includes(skill.toLowerCase())
    );

    const score = Math.round((matchedSkills.length / requiredSkills.length) * 100);
    setMatchScore(score);
    nextStep();
  };

  // Submit application
  const handleSubmit = () => {
    if (matchScore !== null) {
      if (matchScore >= job.matchScore) {
        setMessage({ text: "Application submitted successfully!", type: "success" });
      } else {
        setMessage({ text: "Your match score is too low to apply for this job.", type: "error" });
      }
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button className="absolute top-3 right-3 text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {/* Step 0: Job Details */}
        {step === 0 && (
          <>
            <h2 className="text-2xl text-black font-semibold">{job.title}</h2>
            <p className="text-gray-800">{job.company} • {job.location}</p>
            <p className="text-gray-800">{job.salary}</p>
            <h3 className="font-semibold text-gray-800 mt-4">Required Skills:</h3>
            <ul className="list-disc pl-5">
              {job.requiredSkills.map((skill, index) => (
                <li key={index} className="text-gray-800">{skill}</li>
              ))}
            </ul>
          </>
        )}

        {/* Step 1: Select Skills */}
        {step === 1 && (
          <div>
            <h3 className="text-xl text-black font-semibold">Select Your Skills</h3>

            <div className="mt-3 grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border p-2 rounded">
              {skillOptions.slice(0, visibleSkills).map((skill) => (
                <label key={skill} className="flex items-center text-black space-x-2">
                  <input
                    type="checkbox"
                    value={skill}
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                    className="accent-blue-500"
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>

            {visibleSkills < skillOptions.length && (
              <button
                onClick={loadMoreSkills}
                className="text-blue-600 mt-3 block mx-auto"
              >
                Load More
              </button>
            )}
          </div>
        )}

        {/* Step 2: Match Score & Submission */}
        {step === 2 && (
          <div>
            <h3 className="text-xl text-black font-semibold">Match Score: {matchScore}%</h3>
            <p className="text-gray-800">
              {matchScore === null
                ? "Calculating match score..."
                : matchScore >= job.matchScore
                ? "Great match! You are highly qualified for this job."
                : "Your skills match moderately. Consider improving certain areas."}
            </p>

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded mt-4 w-full hover:bg-blue-700"
            >
              Submit Application
            </button>

            {message && (
              <p className={`mt-3 text-center font-semibold ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {message.text}
              </p>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button className="text-gray-800 flex items-center" onClick={prevStep}>
              <IoArrowBack className="mr-2" /> Back
            </button>
          )}

          {step === 0 && (
            <button
              className="text-blue-600 flex items-center ml-auto"
              onClick={nextStep}
            >
              Next <IoArrowForward className="ml-2" />
            </button>
          )}

          {step === 1 && (
            <button
              className="text-blue-600 flex items-center ml-auto"
              onClick={calculateMatchScore}
            >
              Calculate Score <IoArrowForward className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobModal;