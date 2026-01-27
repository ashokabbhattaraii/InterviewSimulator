import { useMutation, useQuery } from "@tanstack/react-query";
import { useValidateContext } from "@/app/dashboard/Context/ValidateContext";
import { useAuthStore } from "@/app/(auth)/store/userAuth";
import { MockType } from "@/prisma/generated/client";
import { useRouter } from "next/navigation";

interface resultType {
  userId: string;
  mockType: MockType;
  totalAttempt: number;
  totalCorrect: number;
  totalIncorrect: number;
  result: number;
  createdAt?: String | Date;
}

export default function useManageResult() {
  const { user } = useAuthStore();
  const { correctCount, inncorrectCount, setLastAttempt } =
    useValidateContext();
  const router = useRouter();

  return useMutation<resultType>({
    mutationFn: async () => {
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

      if (!response.ok) {
        throw new Error("Failed to update attempts");
      }
      return response.json();
    },
  });
}

export function getAttemptResult() {
  return useQuery({
    queryKey: ["attemptResult"],
    queryFn: async () => {
      const response = await fetch(`/api/result`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch attempt result");
      }
      return response.json();
    },
  });
}
