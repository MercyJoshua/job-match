"use client";
import { useState } from "react";
import { Job, Resume } from "@/types/types";
import ResumeUpload from "./ResumeUpload";
import { IoArrowBack, IoArrowForward, IoClose } from "react-icons/io5";

interface JobModalProps {
  job: Job;
  onClose: () => void;
}


const JobModal = ({ job, onClose }: JobModalProps) => {
  const [step, setStep] = useState(0);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleResumeUpload = async (resume: Resume) => {
    try {
      setSelectedResume(resume); // Set resume first
  
      if (!resume.text) {
        console.error("No resume text found.");
        return;
      }
  
      const response = await fetch("/api/extract-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: resume.text }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to extract skills");
      }
  
      const data = await response.json();
      const extractedSkills = data.extractedSkills || [];
  
      // Ensure state updates
      setSelectedResume((prev) => prev ? ({
        ...prev,
        extractedSkills,
      }) : null);
      
      nextStep(); // Move to Step 2
    } catch (error) {
      console.error("Error processing resume:", error);
    }
  };
  
  
  const handleNext = (resume: Resume) => {
    console.log("Next step with resume:", resume);
    
  };

  // Function to calculate match score
  const calculateMatchScore = (extractedSkills: string[]) => {
    const requiredSkills = job.requiredSkills.map(skill => skill.toLowerCase());
    const matchedSkills = extractedSkills.filter(skill => requiredSkills.includes(skill.toLowerCase()));
    
    const score = Math.round((matchedSkills.length / requiredSkills.length) * 100);
    setMatchScore(score);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button className="absolute top-3 right-3 text-gray-500" onClick={onClose}>
          <IoClose size={24} />
        </button>

        {step === 0 && (
          <>
            <h2 className="text-2xl text-black font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} • {job.location}</p>
            <p className="text-gray-700">{job.salary}</p>
            <h3 className="font-semibold text-gray-600 mt-4">Required Skills:</h3>
            <ul className="list-disc pl-5">
              {job.requiredSkills.map((skill, index) => (
                <li key={index} className="text-gray-600">{skill}</li>
              ))}
            </ul>
          </>
        )}

        {step === 1 && <ResumeUpload onNext={handleNext} onUpload={handleResumeUpload} />}  
        {step === 2 && selectedResume && selectedResume.extractedSkills && (
  <div>
    <h3 className="text-xl font-semibold">Skill Extraction</h3>

    {selectedResume.extractedSkills && selectedResume.extractedSkills.length > 0 ? (
      <>
        <h4 className="font-semibold text-gray-600 mt-4">Extracted Skills:</h4>
        <ul className="list-disc pl-5">
          {selectedResume.extractedSkills.map((skill, index) => (
            <li key={index} className="text-gray-600">{skill}</li>
          ))}
        </ul>
      </>
    ) : (
      <p className="text-gray-600">Extracting skills... Please wait.</p>
    )}
  </div>
)}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold">Match Score: {matchScore}%</h3>
            <p className="text-gray-600">
              {matchScore && matchScore >= 70 
                ? "Great match! You are highly qualified for this job."
                : "Your skills match moderately. Consider improving certain areas."
              }
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4 w-full">
              Submit Application
            </button>
          </div>
        )}

        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button className="text-gray-600 flex items-center" onClick={prevStep}>
              <IoArrowBack className="mr-2" /> Back
            </button>
          )}
          {step < 3 && (
            <button className="text-blue-600 flex items-center ml-auto" onClick={nextStep}>
              Next <IoArrowForward className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobModal;
