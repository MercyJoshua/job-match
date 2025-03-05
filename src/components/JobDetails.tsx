import user from "@/data/user";
import { useEffect, useState } from "react";

interface JobDetailsProps {
  mockJob: {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    requiredSkills: string[];
    matchScore: number;
  };
  onClose: () => void;
}

const JobDetails = ({ mockJob, onClose }: JobDetailsProps) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle Apply Now click
  const handleApply = () => {
    const missingSkills = mockJob.requiredSkills.filter(
      (skill) => !user.skills.includes(skill)
    );

    if (missingSkills.length > 0) {
      setAlertMessage(
        `You are missing skills: ${missingSkills.join(
          ", "
        )}. Consider upskilling before applying.`
      );
    } else {
      setAlertMessage("✅ Application submitted successfully!");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600">
          ✖
        </button>
        <h2 className="text-2xl text-black font-bold">{mockJob.title}</h2>
        <p className="text-gray-600">{mockJob.company} - {mockJob.location}</p>
        <p className="text-gray-800 font-semibold mt-2">Salary: {mockJob.salary}</p>
        
        <p className="mt-3 font-semibold">Required Skills:</p>
        <ul className="list-disc list-inside text-gray-700">
          {mockJob.requiredSkills.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <div className="mt-4">
          <p className="font-semibold">Match Score: {mockJob.matchScore}%</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
            <div
              className={`h-full rounded-full ${
                mockJob.matchScore >= 80 ? "bg-green-500" : mockJob.matchScore >= 50 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${mockJob.matchScore}%` }}
            ></div>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md w-full"
        >
          Apply Now
        </button>

        {/* Alert Message */}
        {alertMessage && (
          <p className={`mt-4 p-2 rounded ${alertMessage.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
            {alertMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
