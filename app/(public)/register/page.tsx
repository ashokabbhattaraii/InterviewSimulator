"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signUp } from "@/app/(auth)/AuthActions/auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { error } from "console";
import { LoginWithGoogle } from "@/app/(auth)/AuthActions/auth";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "Required"),
    lastName: z.string().min(2, "Required"),
    username: z.string().min(3, "Min 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Min 8 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState("");
  async function onSubmit(data: RegisterFormData) {
    console.log("Form data valid and submitted:", data);
    setIsRegistering(true);
    const regStatus = await signUp(data);
    if (regStatus.success !== true) {
      setIsRegistering(false);
      setRegisterError(regStatus?.message || "Failed to register");
    } else {
      setIsRegistering(false);
    }
  }
  const handleOAuthSignUp = async () => {
    setIsRegistering(true);
    console.log("Registering with Google...");
    const res = await LoginWithGoogle();
    if (res.success !== true) {
      throw new Error(res?.message || "Failed to register with Google");
    } else {
      if (res.url) {
        window.location.href = res.url;
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex justify-center items-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-card backdrop-blur-xl rounded-3xl shadow-2xl border border-border overflow-hidden my-4">
        <div className="bg-primary p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground tracking-tight relative z-10">
            Create Account
          </h1>
          <p className="text-primary-foreground/80 mt-1 text-sm relative z-10">
            Join us today and get started
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="firstName"
                className="text-sm font-semibold text-muted-foreground ml-1"
              >
                First Name
              </label>
              <input
                {...register("firstName")}
                type="text"
                id="firstName"
                className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${
                  errors.firstName ? "border-destructive" : "border-border"
                } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                placeholder="John"
              />
              {errors.firstName && (
                <span className="text-destructive text-xs ml-1">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="lastName"
                className="text-sm font-semibold text-muted-foreground ml-1"
              >
                Last Name
              </label>
              <input
                {...register("lastName")}
                type="text"
                id="lastName"
                className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${
                  errors.lastName ? "border-destructive" : "border-border"
                } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <span className="text-destructive text-xs ml-1">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-muted-foreground ml-1"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${
                errors.username ? "border-destructive" : "border-border"
              } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
              placeholder="johndoe"
            />
            {errors.username && (
              <span className="text-destructive text-xs ml-1">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-muted-foreground ml-1"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${
                  errors.password ? "border-destructive" : "border-border"
                } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
              />
              {errors.password && (
                <span className="text-destructive text-xs ml-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirm"
                className="text-sm font-semibold text-muted-foreground ml-1"
              >
                Confirm
              </label>
              <input
                {...register("confirm")}
                type="password"
                id="confirm"
                className={`w-full px-4 py-3 rounded-xl bg-muted/50 border ${
                  errors.confirm ? "border-destructive" : "border-border"
                } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
              />
              {errors.confirm && (
                <span className="text-destructive text-xs ml-1">
                  {errors.confirm.message}
                </span>
              )}
            </div>
          </div>
          {registerError && (
            <p className="text-destructive text-center font-bold text-sm">
              {registerError}
            </p>
          )}
          <button
            type="submit"
            disabled={isRegistering}
            className="mt-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRegistering ? (
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
                Creating...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="flex justify-center mt-6">
            <button
              disabled={isRegistering}
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

          <div className="text-center  pt-4 border-t border-border">
            <Link href="/login" className="inline-flex items-center gap-1">
              <span className="text-muted-foreground text-sm">
                Already have an account?{" "}
              </span>
              <span className="font-bold cursor-pointer text-primary hover:text-primary/80 transition-colors">
                Log In
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
