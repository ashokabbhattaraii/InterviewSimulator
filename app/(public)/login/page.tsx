"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/app/(auth)/store/userAuth";
import { signIn } from "@/app/(auth)/AuthActions/auth";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { setUser } = useAuthStore();
  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data);
      setUser(data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden my-4">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight relative z-10">
            Welcome Back
          </h1>
          <p className="text-blue-200 mt-1 text-sm relative z-10">
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
              } text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              placeholder="name@gmail.com"
            />
            {errors.email && (
              <span className="text-red-400 text-xs ml-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center ml-1">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-300"
              >
                Password
              </label>
              <button
                type="button"
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Forgot?
              </button>
            </div>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full cursor-pointer py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-900/50 hover:shadow-blue-800/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          <div className="text-center mt-1">
            <p className="text-slate-400 text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
