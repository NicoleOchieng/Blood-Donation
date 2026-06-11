import { sql } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { blood_group_needed, hospital, location, urgency } = body;

    const result = await sql`
      INSERT INTO blood_requests (
        clerk_id,
        blood_group_needed,
        hospital,
        location,
        urgency
      )
      VALUES (
        ${userId},
        ${blood_group_needed},
        ${hospital},
        ${location},
        ${urgency}
      )
      RETURNING *;
    `;

    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}