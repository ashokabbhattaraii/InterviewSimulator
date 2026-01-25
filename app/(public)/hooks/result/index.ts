import { useMutation } from "@tanstack/react-query";
import { de } from "zod/locales";
import { useValidateContext } from "@/app/dashboard/Context/ValidateContext";
import { useAuthStore } from "@/app/(auth)/store/userAuth";
import { MockType } from "@/prisma/generated/client";
interface resultType {
  userId: string;
  mockType: MockType;
  totalAttempt: number;
  totalCorrect: number;
  totalIncorrect: number;
  result: number;
}

export default function useManageResult() {
  return useMutation<resultType>({
    mutationFn: async () => {
      const { user } = useAuthStore();
      const { correctCount, inncorrectCount } = useValidateContext();
      const totalAttempt = correctCount + inncorrectCount;
      const payload: resultType = {
        userId: user?.id || "",
        mockType: "MCQ" as MockType,
        totalAttempt: totalAttempt,
        totalCorrect: correctCount,
        totalIncorrect: inncorrectCount,
        result: totalAttempt
          ? Math.round((correctCount / totalAttempt) * 100)
          : 0,
      };
      const response = await fetch("/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Payload data", payload);
      if (!response.ok) {
        throw new Error("Failed to updated attemps");
      }
      return response.json();
    },
  });
}
