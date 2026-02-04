"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "./formValidation";
import { EditUserFormData } from "./formValidation";
import { useForm } from "react-hook-form";
import { useFormContext } from "../../Context";
import GetEditUser from "@/app/(public)/hooks/user";
import { useEffect } from "react";
import { useUpdateUser } from "@/app/(public)/hooks/user";
import { string } from "zod";

interface editFormType {
  fistName: string;
  lastName: string;
  email: string;
  role: string;
  phone?: number;
  username: string;
  status?: string;
}
interface userType {
  phone?: string;
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
interface EditUserProps {
  selectedUserData?: userType;
}

export default function EditUser(selectedUserData: EditUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
  });
  const { isEditing, setIsEditing, editUserId, setEditUserId } =
    useFormContext();

  console.log("datta of edit user from form componsnet", selectedUserData);

  const { mutate: updateUser } = useUpdateUser(editUserId);

  function update(formData: EditUserFormData) {
    console.log("Update form data", formData);
    const res = updateUser(formData);
    setIsEditing(false);
  }

  useEffect(() => {
    if (selectedUserData?.selectedUserData) {
      const user = selectedUserData.selectedUserData;
      reset({
        firstName: user.user_metadata?.firstName || "",
        lastName: user.user_metadata?.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        role: (user.app_metadata?.role || "user") as "user" | "admin",
        status: "active",
      });
    }
  }, [selectedUserData, reset]);

  return (
    <>
      <div className="fixed z-100 inset-0 min-h-screen bg-background/90 backdrop-blur-sm py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-background rounded-lg shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Edit User</h2>

          <form className="space-y-6" onSubmit={handleSubmit(update)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  {...register("firstName")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-destructive">
                  {errors?.firstName?.message}
                </span>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-destructive">
                  {errors?.lastName?.message}
                </span>
              </div>
            </div>

            {/* Email and Phone - Two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  defaultValue={selectedUserData?.selectedUserData?.email}
                  {...register("email")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-destructive">
                  {errors?.email?.message}
                </span>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-destructive">
                  {errors?.phone?.message}
                </span>
              </div>
            </div>

            {/* Role and Status - Two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  {...register("role")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  {...register("status")}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* Buttons - Full width on mobile, side by side on desktop */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2.5 px-4 rounded-md transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
