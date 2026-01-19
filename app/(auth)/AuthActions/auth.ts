"use server";
import { createClient } from "@/lib/server/server";
import { revalidatePath } from "next/cache";
import { Redirect } from "next";
import { redirect } from "next/navigation";
import { success } from "zod";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

interface user {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirm: string;
  role?: string;
}

export async function signUp(formData: user) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        fname: formData.firstName,
        lname: formData.lastName,
        username: formData.username,
        role: "user",
      },
    },
  });
  if (error) {
    console.log("failed ot create user");
    return { success: false };
  }
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function signIn(formData: user) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (data.user?.email === "ashok.ab.bhattaraii@gmail.com") {
    redirect("/admin");
  }
  if (error) {
    console.log(error);
    return { success: false };
  }
}

export async function signOut() {
  const supabase = createClient();
  try {
    (await supabase).auth.signOut();
  } catch (error) {
    throw new Error("Error signing out");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function getUsers(page: number) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Fetch users from Supabase Auth
  const { data, error } = await supabase.auth.admin.listUsers({
    page: page,
    perPage: 5,
  });

  if (error) return { success: false, user: null };
  const total = data.total;
  return { success: true, user: data.users, total };
}
