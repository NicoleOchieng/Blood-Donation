import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await sql`
    SELECT NOW() AS current_time;
  `;

  return NextResponse.json(result);
}