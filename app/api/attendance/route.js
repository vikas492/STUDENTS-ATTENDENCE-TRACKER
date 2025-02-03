import { Attendence, Students } from "@/utils/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/utils";

export async function GET(req){
    const searchParams=req.nextUrl.searchParams
    const grade=searchParams.get('grade')
    const month =searchParams.get('month')
    const result = await db.select ({
        name:Students.name,
        present:Attendence.present,
        day:Attendence.day,
        date:Attendence.date,
        grade:Students.grade,
        studentId:Students.id,
        AttendenceId:Attendence.id
    }).from(Students)
    .leftJoin(Attendence, and(eq(Students.id,Attendence.studentId,eq(Attendence.date,month))))
    .where(eq(Students.grade,grade))
    

    // .where (eq(Students.grade,grade))
    // .where (
    //     or(
    //         eq(Attendence.date,month),
    //     isNull(Attendence.date)
    //     )
    // )

    return NextResponse.json(result)
};

export async function POST(req,res){
    const data = await req.json();
    const result = await db.insert(Attendence)
    .values({
        studentId :data.studentId,
        present:data.present,
        day:data.day,
        date:data.date
    })
    return NextResponse.json(result);

};
// export async function DELETE(req){
//     const searchParams=req.nextUrl.searchParams;
//     const studentId = searchParams.get('studentId');
//     const date = searchParams.get('date');
//     const day = searchParams.get('day');
//     const result = db.delete(Attendence)
//     .where(
//         and(
//         eq(Attendence.studentId,studentId),
//         eq(Attendence.day, day),
//         eq(Attendence.date, date)
//         )
//     )
//     return NextResponse.json(result);
// }


export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const studentId = searchParams.get("studentId");
    const date = searchParams.get("date");
    const day = searchParams.get("day");

    try {
        // Perform the delete operation
        const result = await db.delete(Attendence)
            .where(
                and(
                    eq(Attendence.studentId, studentId),
                    eq(Attendence.day, day),
                    eq(Attendence.date, date)
                )
            );

        // Return a success response with relevant data
        return NextResponse.json({ success: true, affectedRows: result?.rowCount || 0 });
    } catch (error) {
        // Log and handle any errors
        console.error("DELETE operation failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
