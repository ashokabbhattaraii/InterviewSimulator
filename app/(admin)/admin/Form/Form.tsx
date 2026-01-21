"use client";
import { useFormContext } from "../Context";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddUser } from "@/app/(auth)/AuthActions/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
const userSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
    role: z.enum(["admin", "user", "moderator"], {
      errorMap: () => ({ message: "Please select a role" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type UserFormData = z.infer<typeof userSchema>;

export default function AddUserForm() {
  const queryClient = useQueryClient();
  const [addUserError, setAddUserError] = useState("");
  const { setIsAddUserFormOpen, isAddUserFormOpen } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const addUserMutation = useMutation({
    mutationFn: async (data: UserFormData) => {
      const res = await AddUser(data);
      console.log("add user", data);
      if (res.success) {
        console.log("User added successfully", res.message);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setIsAddUserFormOpen(false);
      } else {
        console.log(res.message);
        setAddUserError(res.message);
      }
    },
  });

  const onSubmit = (data: UserFormData) => {
    addUserMutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex justify-center items-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-800 p-5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
          <h1 className="text-2xl font-bold text-white relative z-10">
            Add New User
          </h1>
          <p className="text-blue-200 mt-1 text-xs relative z-10">
            Fill in the details to create a new user
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 grid grid-cols-2 gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-300">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-600 text-white text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="John"
            />
            {errors.firstName && (
              <span className="text-red-400 text-xs">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-300">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-600 text-white text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Doe"
            />
            {errors.lastName && (
              <span className="text-red-400 text-xs">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-300">
              Username
            </label>
            <input
              {...register("username")}
              className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-600 text-white text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="johndoe"
            />
            {errors.username && (
              <span className="text-red-400 text-xs">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-300">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-600 text-white text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="name@gmail.com"
            />
            {errors.email && (
              <span className="text-red-400 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-300">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-600 text-white text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {errors.password && (
              <span className="text-red-400 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-300">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-600 text-white text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <span className="text-red-400 text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-xs font-semibold text-slate-300">Role</label>
            <select
              {...register("role")}
              className="px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-600 text-white text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
            {errors.role && (
              <span className="text-red-400 text-xs">
                {errors.role.message}
              </span>
            )}
          </div>

          {addUserError && (
            <div className="col-span-2 bg-red-500/20 border border-red-500/50 rounded-lg p-2">
              <p className="text-red-400 text-xs">{addUserError}</p>
            </div>
          )}

          <div className="col-span-2 flex gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg"
            >
              Add User
            </button>
            <button
              type="button"
              onClick={() => setIsAddUserFormOpen(!isAddUserFormOpen)}
              className="flex-1 py-2 bg-slate-700 text-slate-200 font-bold text-sm rounded-lg hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
