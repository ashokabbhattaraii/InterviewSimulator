import { createClient } from "@/lib/server/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("Question").select("*");
  console.log("data xxxxxx", data);
  if (error) {
    console.log("xxxxxxx", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
  return NextResponse.json(data, { status: 200 });
}
