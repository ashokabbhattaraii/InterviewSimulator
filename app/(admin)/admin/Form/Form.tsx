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
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto z-50">
      <div className="w-full max-w-3xl bg-card backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden">
        <div className="bg-primary p-5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <h1 className="text-2xl font-bold text-primary-foreground relative z-10">
            Add New User
          </h1>
          <p className="text-primary-foreground/80 mt-1 text-xs relative z-10">
            Fill in the details to create a new user
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 grid grid-cols-2 gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-muted-foreground"
              placeholder="John"
            />
            {errors.firstName && (
              <span className="text-destructive text-xs">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-muted-foreground"
              placeholder="Doe"
            />
            {errors.lastName && (
              <span className="text-destructive text-xs">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">
              Username
            </label>
            <input
              {...register("username")}
              className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-muted-foreground"
              placeholder="johndoe123"
            />
            {errors.username && (
              <span className="text-destructive text-xs">
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">
              Email Address
            </label>
            <input
              {...register("email")}
              className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-muted-foreground"
              placeholder="john@example.com"
            />
            {errors.email && (
              <span className="text-destructive text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-muted-foreground"
              placeholder="••••••••"
            />
            {errors.password && (
              <span className="text-destructive text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-muted-foreground">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-muted-foreground"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <span className="text-destructive text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-xs font-semibold text-muted-foreground">
              Role
            </label>
            <select
              {...register("role")}
              className="px-3 py-2 rounded-lg bg-muted/50 border border-border text-foreground text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="" disabled selected>
                Select a role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
            {errors.role && (
              <span className="text-destructive text-xs">
                {errors.role.message}
              </span>
            )}
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => setIsAddUserFormOpen(false)}
              className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-semibold hover:bg-muted/80 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
