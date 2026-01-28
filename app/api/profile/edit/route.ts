import { createClient } from "@/lib/server/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  const {
    name,
    phone,
    bio,
    location,
    avatar,
  }: {
    name: string;
    email?: string;
    phone?: string;
    bio?: string;
    location?: string;
    avatar?: string;
  } = body;

  const [fName, ...rest] = name.trim().split(" ");
  const lName = rest.join(" ");
  console.log("Body of profile ", body);
  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({
    data: {
      firstName: fName,
      lastName: lName,
      user_metadata: {
        bio: bio,
        location: location,
        phone: phone,
      },
    },
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
