"use server";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const parsePDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const data = await pdfParse(buffer);
  return data.text;
};

export const parseDOCX = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

export const extractText = async (file: File): Promise<string> => {
  if (file.type === "application/pdf") {
    return parsePDF(file);
  } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    return parseDOCX(file);
  } else {
    throw new Error("Unsupported file type");
  }
};
