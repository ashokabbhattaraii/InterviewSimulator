import { NextResponse, NextRequest } from "next/server";
import createClient from "@/lib/client/client";
import { error } from "console";
import { Difficulty } from "@/prisma/generated/client";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const difficulty = searchParams.get("difficulty");
  const supabase = await createClient();
  const qns = await supabase.rpc("get_qns_by_difficulty", {
    count_params: 10,
    user_difficulty: difficulty?.toUpperCase(),
  });
  console.log("data xxxxxx", qns);
  return NextResponse.json(qns, { status: 200 });
}
