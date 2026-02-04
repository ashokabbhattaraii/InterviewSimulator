import { useMutation } from "@tanstack/react-query";
interface UpdateProfilePayload {
  name: string;
  phone?: string;
  bio: string;
  location: string;
  avatar: string;
}
export default function useUpdateProfileMutation(
  payload: UpdateProfilePayload,
) {
  return useMutation<UpdateProfilePayload, void>({
    mutationKey: ["profile"],
    mutationFn: async () => {
      const res = await fetch("/api/profile/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        return res.json();
      }
    },
  });
}
