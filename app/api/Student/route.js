import { NextResponse } from "next/server";
import { db } from "@/utils";
import { Students } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req, res) {
    try {
        const data = await req.json();
        const result = await db.insert(Students).values({
            name: data?.name,
            grade: data?.grade,
            contact: data?.contact,
            address: data?.address
        });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const result = await db.select().from(Students);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id');
        const result = await db.delete(Students).where(eq(Students.id, id));
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}