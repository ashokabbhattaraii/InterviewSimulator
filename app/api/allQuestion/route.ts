// app/api/allQuestion/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const questions = await prisma.question.findMany({});

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error("Error fetching all questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}
