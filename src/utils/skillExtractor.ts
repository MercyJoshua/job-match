import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Extract full text from a resume file
export async function extractText(filePath: string): Promise<string> {
  try {
    // Read file content
    const fileContent = fs.readFileSync(filePath, "utf8");
    return fileContent; // Return raw text content
  } catch (error) {
    console.error("Text extraction error:", error);
    return "";
  }
}

// Extract skills from resume text
export async function extractSkills(text: string): Promise<string[]> {
  try {
    // Use OpenAI to analyze the content
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `Extract technical skills from this resume:\n\n${text}` }],
    });

    const extractedSkills = response.choices[0]?.message?.content?.split(",") || [];
    
    return extractedSkills.map(skill => skill.trim());
  } catch (error) {
    console.error("Skill extraction error:", error);
    return [];
  }
}
