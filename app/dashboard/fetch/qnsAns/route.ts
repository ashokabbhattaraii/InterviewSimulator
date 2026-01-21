"use server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { error } from "console";

export async function GET() {
  try {
    const questionId = "q1";
    const questionWithAnswers = await prisma.Question.findUnique({
      where: { id: questionId },
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
