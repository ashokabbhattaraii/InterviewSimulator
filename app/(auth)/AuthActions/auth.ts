"use server";
import { createClient } from "@/lib/server/server";
import { success } from "zod";
import { revalidatePath } from "next/cache";
import { Redirect } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { error } from "node:console";
import Error from "next/error";

interface user {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirm: string;
  role: string;
}
interface userType {
  id: string;
  email: string;
  created_at: string;
  user_metadata: {
    firstName?: string;
    lastName?: string;
    username?: string;
  };
  app_metadata: {
    role?: string;
  };
}

export async function signUp(formData: user) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: "user",
      },
    },
  });
  if (error) {
    console.log("failed ot create user");
    return { success: false, message: error.message };
  }
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function signIn(formData: { email: string; password: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { success: false, message: error.message }; // <-- must exist
  }

  if (data.user) {
    return {
      success: true,
      user: data.user,
      redirect:
        data.user?.app_metadata.role === "admin" ? "/admin" : "/dashboard",
    };
  }

  return { success: false, message: "Unknown error" };
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Error signing out:", error.message);
    return { success: false, message: error.message };
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
    },
  );

  const { data, error } = await supabase.auth.admin.listUsers({
    page: page,
    perPage: 5,
  });

  if (error) return { success: false, user: null };
  const total = data.total;
  return { success: true, user: data.users, total };
}

export async function AddUser(formData: user) {
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
    },
  );
  console.log("form back", formData);

  const { data, error } = await supabase.auth.admin.createUser({
    email: formData.email,
    password: formData.password,
    user_metadata: {
      firstName: formData.firstName,
      lastName: formData.lastName,
    },
    app_metadata: {
      role: formData.role,
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "User Added successfully" };
}

export async function LoginWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/dashboard",
      queryParams: {
        prompt: "select_account",
      },
    },
  });
  console.log("data", data);
  console.log("Error", error);
  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Redirecting to google", url: data.url };
}
