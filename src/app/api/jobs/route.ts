import jobs from "@/data/jobs";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(jobs);
}
