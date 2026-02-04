import { useMutation } from "@tanstack/react-query";
interface changePasswordType {
  currentUser: string;
  oldPass: string;
  newPass: string;
}
import apiCollection from "@/app/api-collection";
export default function useChangePassword(data: changePasswordType) {
  console.log("Data rece", data);
  return useMutation<void, changePasswordType>({
    mutationKey: ["user-pass"],
    mutationFn: async () => {
      const res = await fetch(apiCollection.CHNAGE_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return res.json();
    },
  });
}
