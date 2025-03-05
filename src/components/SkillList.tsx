"use client";

interface SkillListProps {
  extractedSkills: string[];
}

const SkillList = ({ extractedSkills }: SkillListProps) => {
  console.log("Extracted Skills:", extractedSkills); // Add this line for debugging

  return (
    <div>
      <h3 className="text-xl font-semibold">Skill Extraction</h3>

      {extractedSkills.length > 0 ? (
        <>
          <h4 className="font-semibold text-gray-600 mt-4">Extracted Skills:</h4>
          <ul className="list-disc pl-5">
            {extractedSkills.map((skill, index) => (
              <li key={index} className="text-gray-600">{skill}</li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-gray-600">Extracting skills... Please wait.</p>
      )}
    </div>
  );
};

export default SkillList;