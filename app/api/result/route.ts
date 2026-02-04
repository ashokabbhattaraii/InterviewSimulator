import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { MockType } from "@/prisma/generated/client";
import { createClient } from "@/lib/server/server";
import { success } from "zod";
interface resultType {
  userId: string;
  mockType: MockType;
  totalAttempt: number;
  totalCorrect: number;
  totalIncorrect: number;
  result: number;
  createdAt?: Date;
}
import { useAuthStore } from "@/app/(auth)/store/userAuth";
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

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  const userId = user?.id;

  try {
    const response = await prisma.attempt.findMany({
      where: { userId: userId || undefined },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      { success: true, data: response },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error || error },
      { status: 500 },
    );
  }
}
