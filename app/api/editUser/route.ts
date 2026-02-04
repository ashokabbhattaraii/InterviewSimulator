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
  try {
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

    if (!userId) {
      return NextResponse.json(
        { error: "Failed to get user" },
        { status: 404 },
      );
    }

    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      email: body.email,
      phone: body.phone,
      user_metadata: {
        firstName: body.firstName,
        lastName: body.lastName,
      },
      app_metadata: {
        role: body.role, // Fixed: Remove nested object
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
