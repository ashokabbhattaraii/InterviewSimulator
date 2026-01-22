import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { set } from "zod";
import { id } from "zod/locales";

export async function DELETE(req: Request) {
  const cookie = await cookies();
  const { userId } = await req.json();

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
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 },
    );
  }
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
