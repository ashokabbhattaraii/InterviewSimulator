"use server";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Difficulty } from "@/prisma/generated/client/wasm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const qnsId = (await params).id;
  const searchParams = request.nextUrl.searchParams;
  const difficulty = searchParams.get("difficulty");

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

    // Filter by difficulty if needed
    if (
      difficulty &&
      questionWithAnswers.difficulty !== difficulty.toUpperCase()
    ) {
      return NextResponse.json(
        { error: "Question not found with specified difficulty" },
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
