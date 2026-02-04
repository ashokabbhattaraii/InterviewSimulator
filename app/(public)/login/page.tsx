"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/app/(auth)/store/userAuth";
import { LoginWithGoogle, signIn } from "@/app/(auth)/AuthActions/auth";
import { redirect } from "next/navigation";
import { useState } from "react";
import { is } from "zod/locales";
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
  const handleOAuthSignUp = async () => {
    const res = await LoginWithGoogle();
    if (res.url) {
      window.location.href = res.url;
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
          <div className="flex justify-center mt-6">
            <button
              disabled={isSubmitting}
              onClick={() => handleOAuthSignUp()}
              type="button"
              className="p-3 rounded-full cursor-pointer hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Sign up with Google"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </button>
          </div>

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
