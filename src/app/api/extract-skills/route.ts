import { NextRequest, NextResponse } from "next/server";

// Sample list of IT-related skills
const IT_SKILLS = [
  "JavaScript", "React", "Vue", "Node.js", "TypeScript", "Python", "Django",
  "Express", "Next.js", "MongoDB", "SQL", "MySQL", "PostgreSQL", "Docker",
  "Kubernetes", "Git", "REST API", "GraphQL", "AWS", "Azure", "Firebase", "CI/CD", "Figma"
];

// Function to extract skills from resume text
const extractSkills = (resumeText: string): string[] => {
  return IT_SKILLS.filter(skill =>
    resumeText.toLowerCase().includes(skill.toLowerCase())
  );
};

// ✅ Use `export async function POST(req: NextRequest)`
export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json();
    
    if (!resumeText) {
      return NextResponse.json({ message: "Resume text is required" }, { status: 400 });
    }

    const extractedSkills = extractSkills(resumeText);
    return NextResponse.json({ extractedSkills }, { status: 200 });

  } catch (error) {
    console.error("Skill extraction error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
