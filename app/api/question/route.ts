import { createClient } from "@/lib/server/server";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { error } from "console";
import { Difficulty } from "@/prisma/generated/client";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const difficulty = searchParams.get("difficulty");
  const supabase = await createClient();
  const qns = await prisma.question.findMany({
    where: {
      difficulty: difficulty as Difficulty,
    },
  });
  console.log("data xxxxxx", qns);
  return NextResponse.json(qns, { status: 200 });
}
