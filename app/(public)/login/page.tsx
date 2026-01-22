"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/app/(auth)/store/userAuth";
import { signIn } from "@/app/(auth)/AuthActions/auth";
import { redirect } from "next/navigation";
import { useState } from "react";
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  type LoginFormData = z.infer<typeof loginSchema>;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { setUser } = useAuthStore();
  const [errorMsg, setError] = useState("");
  const onSubmit = async (data: LoginFormData) => {
    setError("");
    const res = await signIn(data);

    if (res?.success) {
      setUser(res.user);
      router.push(res.redirect || "/dashboard");
    } else {
      setError(res?.message || "An error occurred");
      console.log("Login error:", res?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex justify-center items-center p-4 ">
      <div className="w-full max-w-md bg-card backdrop-blur-xl rounded-3xl shadow-2xl border border-border overflow-hidden my-4">
        {/* Header Section */}
        <div className="bg-primary p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground tracking-tight relative z-10">
            Welcome Back
          </h1>
          <p className="text-primary-foreground/80 mt-1 text-sm relative z-10">
            Log in to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-muted-foreground ml-1"
            >
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${
                errors.email ? "border-destructive" : "border-border"
              } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
              placeholder="name@gmail.com"
            />
            {errors.email && (
              <span className="text-destructive text-xs ml-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center ml-1">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-muted-foreground"
              >
                Password
              </label>
              <button
                type="button"
                className="text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer"
              >
                Forgot?
              </button>
            </div>
            <input
              {...register("password")}
              type="password"
              id="password"
              className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${
                errors.password ? "border-destructive" : "border-border"
              } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
              placeholder="••••••••"
            />
            {errors.password && (
              <span className="text-destructive text-xs ml-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>
          {errorMsg && (
            <span className="text-destructive text-center font-bold text-sm">
              {errorMsg}
            </span>
          )}
          <div className="text-center mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-bold hover:text-primary/80 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
