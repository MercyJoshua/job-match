"use client";

interface ResumeMatcherProps {
  skills: string[];
  matchedJobs: { title: string; matchScore: number }[];
}

const ResumeMatcher: React.FC<ResumeMatcherProps> = ({ skills, matchedJobs }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {skills.length > 0 ? (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700">Extracted Skills:</h3>
          <p className="text-gray-600">{skills.join(", ")}</p>

          <h3 className="font-semibold text-gray-700 mt-4">Job Matches:</h3>
          <ul>
            {matchedJobs.map((job, index) => (
              <li key={index} className="mt-2">
                {job.title} - Match: {job.matchScore}%
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-600">Upload a resume to see matches.</p>
      )}
    </div>
  );
};

export default ResumeMatcher;
