import { NextRequest, NextResponse } from "next/server";
import mockJobs from "@/data/jobs"; // Import jobs from jobs.ts

export async function POST(req: NextRequest) {
  try {
    const { skills } = await req.json();
    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json({ error: "Invalid skills data" }, { status: 400 });
    }

    // Match jobs based on skill overlap
    const matchedJobs = mockJobs
      .map((job) => {
        const matchingSkills = job.requiredSkills.filter((skill) => skills.includes(skill));
        const matchScore = (matchingSkills.length / job.requiredSkills.length) * 100;

        return { ...job, matchScore: Math.round(matchScore) };
      })
      .filter((job) => job.matchScore > 0) // Only return jobs with at least 1 matching skill
      .sort((a, b) => b.matchScore - a.matchScore); // Sort by highest match

    return NextResponse.json({ matchedJobs });
  } catch (error) {
    console.error("Error matching jobs:", error);
    return NextResponse.json({ error: "Failed to match jobs" }, { status: 500 });
  }
}
