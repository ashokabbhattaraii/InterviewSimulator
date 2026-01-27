import { NextResponse, NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { headers } from "next/headers";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const header = await headers();
  const userId = header.get("userId");
  const cookie = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookie.get(name)?.value;
        },
      },
    },
  );
  console.log("UserId from header", userId);
  if (!userId)
    return NextResponse.json({ error: "Failed to get user" }, { status: 404 });
  const res = await supabase.auth.admin.getUserById(userId);
  if (res) {
    return NextResponse.json(res, { status: 200 });
  }
}

export async function PATCH(request: Request) {
  const cookie = await cookies();
  const header = await headers();
  const body = await request.json();
  const userId = header.get("x-user-id");
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookie.get(name)?.value;
        },
      },
    },
  );
  if (!userId)
    return NextResponse.json({ error: "Failed to get user" }, { status: 404 });
  const res = await supabase.auth.admin.updateUserById(userId, {
    email: body.email,
    user_metadata: {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
    },
    app_metadata: {
      role: { role: body.role },
    },
  });
  if (res) {
    return NextResponse.json(res, { status: 200 });
  }
}
