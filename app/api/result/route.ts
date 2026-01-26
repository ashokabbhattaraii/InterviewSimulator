import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { MockType } from "@/prisma/generated/client";
import { success } from "zod";
interface resultType {
  userId: string;
  mockType: MockType;
  totalAttempt: number;
  totalCorrect: number;
  totalIncorrect: number;
  result: number;
}
export async function POST(request: NextRequest) {
  const body: resultType = await request.json();
  console.log("Result data", body);
  try {
    const row = await prisma.attempt.create({
      data: {
        userId: body.userId,
        mockType: body.mockType as MockType,
        totalAttempt: body.totalAttempt,
        totalCorrect: body.totalCorrect,
        totalIncorrect: body.totalIncorrect,
        result: body.result,
      },
    });
    return NextResponse.json({ success: true, row }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error || error },
      { status: 500 },
    );
  }
}
