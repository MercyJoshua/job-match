import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use server-side environment variable
});

export async function extractSkillsFromOpenAI(text: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: "Extract all technical skills from this resume text. Return only a comma-separated list of skills.",
        },
        { role: "user", content: text },
      ],
      temperature: 0,
    });

    // Extract and format skills from the response
    const skillsText = response.choices[0].message?.content || "";
    const skills = skillsText
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0); // Remove empty strings

    return skills;
  } catch (error) {
    console.error("OpenAI extraction error:", error);
    return [];
  }
}