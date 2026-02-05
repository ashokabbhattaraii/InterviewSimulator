import { useMutation } from "@tanstack/react-query";
interface UpdateProfilePayload {
  name: string;
  phone?: string;
  bio: string;
  location: string;
  avatar: string;
}
export default function useUpdateProfileMutation() {
  return useMutation<UpdateProfilePayload, Error, UpdateProfilePayload>({
    mutationKey: ["profile"],
    mutationFn: async (payload: UpdateProfilePayload) => {
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
