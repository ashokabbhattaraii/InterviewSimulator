import { z } from "zod";

export const editUserSchema = z.object({
  firstName: z.string().min(2, "Name must be atleast 2 characters"),
  lastName: z.string().min(2, "Last name must be atleast 2 character"),
  email: z.string().email("Inavlid email address"),
  phone: z.string().min(10, "Phone number must be 10 digits").optional(),
  role: z.enum(["user", "admin"]),
  status: z.enum(["active", "inactive", "suspended"]),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;
