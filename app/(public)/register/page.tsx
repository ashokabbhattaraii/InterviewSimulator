"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signUp } from "@/app/(auth)/AuthActions/auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { error } from "console";
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
    }
  }

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

          <div className="text-center mt-4 pt-4 border-t border-border">
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
