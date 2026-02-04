import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/server/server";
import { Session } from "inspector/promises";
import { success } from "zod";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { oldPass, newPass, currentUser } = await request.json();
  const userToChangePass = await supabase.auth.getUser(currentUser);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userToChangePass?.data?.user?.email || "",
    password: oldPass,
  });
  if (data) {
    const changePass = await supabase.auth.updateUser({
      password: newPass,
    });
    if (!changePass) {
      return NextResponse.json({ status: 500, success: false });
    }
    return NextResponse.json({ status: 201, success: true });
  }
}
