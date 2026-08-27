import { NextResponse, type NextRequest } from "next/server";
import { getDefaultResume } from "@/lib/content";

export function GET(request: NextRequest) {
  const resume = getDefaultResume();
  return NextResponse.redirect(new URL(resume.file, request.url));
}
