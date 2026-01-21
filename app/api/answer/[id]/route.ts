"use server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const qnsId = (await params).id;
  try {
    const questionWithAnswers = await prisma.question.findUnique({
      where: { id: qnsId },
      include: {
        answers: true,
      },
    });
    console.log(questionWithAnswers);
    if (!questionWithAnswers) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(questionWithAnswers, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 },
    );
  }
}
