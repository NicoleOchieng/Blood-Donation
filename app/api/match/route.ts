import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

const compatibility: Record<string, string[]> = {
  "O-": ["O-"],
  "O+": ["O+", "O-"],
  "A-": ["A-", "O-"],
  "A+": ["A+", "A-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "AB-": ["AB-", "A-", "B-", "O-"],
  "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const blood = searchParams.get("blood");

  if (!blood) {
    return NextResponse.json(
      { error: "Blood group required" },
      { status: 400 }
    );
  }

  const allowed = compatibility[blood];

  const donors = await sql`
    SELECT *
    FROM donors
    WHERE blood_group = ANY(${allowed})
    AND available = true
    ORDER BY created_at DESC;
  `;

  return NextResponse.json(donors);
}