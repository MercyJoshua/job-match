"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Resume } from "@/types/types";

interface ResumeUploadProps {
  onNext?: (resume: Resume) => void; 
  onUpload: (_resume: Resume, skills: string[]) => void;
}

const ResumeUpload = ({ onNext }: ResumeUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the hidden file input

  useEffect(() => {
    // Load previously uploaded resumes from localStorage
    const storedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    setResumes(storedResumes);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const response = await axios.post("/api/upload-resume", formData);
  
      const newResume: Resume = {
        id: Date.now(),
        name: selectedFile.name,
        url: `${window.location.origin}${response.data.url}`, // Full URL
        text: response.data.text, // Store extracted text
        extractedSkills: response.data.skills,
      };
  
      const updatedResumes = [...resumes, newResume];
      setResumes(updatedResumes);
      localStorage.setItem("resumes", JSON.stringify(updatedResumes));
  
      onNext?.(newResume); 
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUseResume = async (resume: Resume) => {
    try {
      if (!resume.text) {
        console.error("No extracted text available for this resume.");
        return;
      }
  
      const response = await axios.post("/api/extract-skills", {
        resumeText: resume.text, // Send stored text
      });
  
      const updatedResume: Resume = {
        ...resume,
        extractedSkills: response.data.extractedSkills,
      };
  
      onNext?.(updatedResume); 
    } catch (error) {
      console.error("Error extracting skills:", error);
    }
  };
  
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl text-black font-semibold mb-4">Upload Your Resume</h2>

      {/* Upload Section */}
      <div 
        className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()} // Trigger file input on click
      >
        <FaCloudUploadAlt className="text-gray-500 text-4xl mx-auto mb-2" />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        <label className="block mt-2 cursor-pointer text-blue-600 font-semibold">
          {selectedFile ? selectedFile.name : "Click to browse or drag & drop"}
        </label>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4 w-full hover:bg-blue-700 transition"
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      {/* Previously Uploaded Resumes */}
      <h3 className="text-lg text-gray-600 font-semibold mt-6">Previously Uploaded Resumes</h3>
      <ul className="mt-2">
        {resumes.map((resume) => (
          <li key={resume.id} className="p-2 border-b flex text-blue-400 justify-between">
            <span>{resume.name}</span>
            <button 
             onClick={() => handleUseResume(resume)} 
              className="text-blue-500 hover:underline"
            >
              Use this
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeUpload;
