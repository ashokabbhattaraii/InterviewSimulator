import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormContext } from "@/app/(admin)/admin/Context";
import {
  EditUserFormData,
  editUserSchema,
} from "@/app/(admin)/admin/Components/editForm/formValidation";
export default function GetEditUser() {
  const { editUserId } = useFormContext();
  return useQuery({
    queryKey: ["editUser", editUserId],
    queryFn: async () => {
      const res = await fetch("/api/editUser", {
        method: "GET",
        headers: {
          userId: String(editUserId),
        },
      });
      return res.json();
    },
    enabled: !!editUserId,
  });
}

export function useUpdateUser(userId: string) {
  return useMutation({
    mutationKey: ["updateUser", userId],
    mutationFn: async (formData: EditUserFormData) => {
      const res = await fetch("/api/editUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      return res.json();
    },
  });
}
