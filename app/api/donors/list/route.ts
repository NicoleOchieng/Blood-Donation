import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const donors = await sql`
      SELECT *
      FROM donors
      ORDER BY created_at DESC;
    `;

    return NextResponse.json(donors);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}