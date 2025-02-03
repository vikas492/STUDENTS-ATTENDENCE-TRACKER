import { db } from "@/utils";
import { Attendence, Students } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const grade = searchParams.get("grade");

    // Validate inputs
    if (!date || !grade) {
      return NextResponse.json(
        { error: "Missing required query parameters: date or grade" },
        { status: 400 }
      );
    }

    // Database query
    const result = await db
      .select({
        day: Attendence.day,
        presentCount: sql`COUNT(${Attendence.day})`,
      })
      .from(Attendence)
      .leftJoin(
        Students,
        and(
          eq(Attendence.studentId, Students.id),
          eq(Attendence.date, date) // Ensure date is correctly compared
        )
      )
      .groupBy(Attendence.day)
      .where(eq(Students.grade, grade))
      .orderBy(desc(Attendence.day))
      .limit(7);
    

    // Return result as JSON
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance data", details: error.message },
      { status: 500 }
    );
  }
  
}
