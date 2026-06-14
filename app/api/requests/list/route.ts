import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const requests = await sql`
      SELECT *
      FROM blood_requests
      ORDER BY created_at DESC;
    `;

    return NextResponse.json(requests);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}