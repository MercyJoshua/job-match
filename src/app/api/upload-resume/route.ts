import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { extractText, extractSkills } from "@/utils/skillExtractor";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Define the upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save file locally
    const filePath = path.join(uploadDir, file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    console.log("File saved at:", filePath);

    // Extract text from the resume
    const resumeText = await extractText(filePath);

    // Extract skills from text
    const skills = await extractSkills(resumeText);

    return NextResponse.json({ 
      url: `/uploads/${file.name}`,
      text: resumeText, // Include extracted text in the response
      skills,
    });

  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
