import { Resume } from "@/types/types";
import { FaDownload, FaEye, FaFileAlt, FaTrashAlt } from "react-icons/fa";


export interface ResumeListProps {
  resumes: Resume[];
  onDelete: (id: number) => void;
}

const ResumeList: React.FC<ResumeListProps> = ({ resumes, onDelete }) => {
  if (resumes.length === 0) return null;

   // Handle resume preview
   const handlePreview = (resume: Resume) => {
    window.open(resume.url, "_blank"); // Open in a new tab
  };

  // Handle resume download
  const handleDownload = (resume: Resume) => {
    const link = document.createElement("a");
    link.href = resume.url;
    link.download = resume.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-6 max-w-full">
      <h3 className="font-semibold text-gray-700">Your Resumes</h3>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        {resumes.map((resume) => (
      <div key={resume.id} className="bg-rose-400 p-3 rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center">
        <FaFileAlt className="text-gray-600 mr-3 flex-shrink-0" />
        <span className="text-gray-800 truncate">{resume.name}</span>
      </div>
      
      {/* Buttons below the file name */}
      <div className="flex justify-end space-x-3 mt-2">
      <button onClick={() => handlePreview(resume)} className="text-green-600 hover:text-green-800">
                <FaEye /> {/* Preview Icon */}
              </button>
             
        <button onClick={() => onDelete(resume.id)} className="text-red-600 hover:text-red-800">
          <FaTrashAlt />
        </button>
        <button onClick={() => handleDownload(resume)} className="text-blue-600 hover:text-blue-800">
          <FaDownload />
        </button>
      </div>
    </div>
    
        ))}
      </div>
    </div>
  );
};

export default ResumeList;
