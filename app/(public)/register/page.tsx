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
    <div className="fixed inset-0 bg-black flex justify-center items-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden my-4">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight relative z-10">
            Create Account
          </h1>
          <p className="text-blue-200 mt-1 text-sm relative z-10">
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
                className="text-sm font-semibold text-slate-300 ml-1"
              >
                First Name
              </label>
              <input
                {...register("firstName")}
                type="text"
                id="firstName"
                className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${
                  errors.firstName ? "border-red-500" : "border-slate-600"
                } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                placeholder="John"
              />
              {errors.firstName && (
                <span className="text-red-400 text-xs ml-1">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="lastName"
                className="text-sm font-semibold text-slate-300 ml-1"
              >
                Last Name
              </label>
              <input
                {...register("lastName")}
                type="text"
                id="lastName"
                className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${
                  errors.lastName ? "border-red-500" : "border-slate-600"
                } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <span className="text-red-400 text-xs ml-1">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-slate-300 ml-1"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${
                errors.username ? "border-red-500" : "border-slate-600"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              placeholder="johndoe"
            />
            {errors.username && (
              <span className="text-red-400 text-xs ml-1">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-300 ml-1"
            >
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${
                errors.email ? "border-red-500" : "border-slate-600"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              placeholder="name@gmail.com"
            />
            {errors.email && (
              <span className="text-red-400 text-xs ml-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-300 ml-1"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${
                  errors.password ? "border-red-500" : "border-slate-600"
                } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              {errors.password && (
                <span className="text-red-400 text-xs ml-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirm"
                className="text-sm font-semibold text-slate-300 ml-1"
              >
                Confirm
              </label>
              <input
                {...register("confirm")}
                type="password"
                id="confirm"
                className={`w-full px-4 py-3 rounded-xl bg-slate-900/50 border ${
                  errors.confirm ? "border-red-500" : "border-slate-600"
                } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              {errors.confirm && (
                <span className="text-red-400 text-xs ml-1">
                  {errors.confirm.message}
                </span>
              )}
            </div>
          </div>
          {registerError && <p className="text-red-400">{registerError}</p>}
          <button
            type="submit"
            disabled={isRegistering}
            className="mt-2 w-full py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-900/50 hover:shadow-blue-800/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRegistering ? "Creating..." : "Create Account"}
          </button>

          <div className="text-center mt-1 cursor-pointer">
            <Link href="/login">
              <span className="text-slate-400 text-sm">
                Already have an account?{" "}
              </span>
              <button
                type="button"
                onClick={() => console.log("Navigate to login")}
                className="font-semibold cursor-pointer text-blue-400 hover:text-blue-300 transition-colors "
              >
                Log In
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
