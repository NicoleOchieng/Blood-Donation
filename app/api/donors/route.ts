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

    const { full_name, blood_group, phone, location } = body;

    const result = await sql`
      INSERT INTO donors (
        clerk_id,
        full_name,
        blood_group,
        phone,
        location
      )
      VALUES (
        ${userId},
        ${full_name},
        ${blood_group},
        ${phone},
        ${location}
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