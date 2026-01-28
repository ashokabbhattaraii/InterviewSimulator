import { useAuthStore } from "@/app/(auth)/store/userAuth";
import { getAttemptResult } from "@/app/(public)/hooks/result";
import { useRouter } from "next/navigation";
import { MockType } from "@/prisma/generated/client";
import calculateStreak from "../calculateStreak";
interface resultType {
  userId: string;
  mockType: MockType;
  totalAttempt: number;
  totalCorrect: number;
  totalIncorrect: number;
  result: number;
  createdAt?: string | Date;
}
export default function UserResult() {
  const { user } = useAuthStore();
  const router = useRouter();
  console.log("UIser", user);
  const { data, isFetching, error, isLoading } = getAttemptResult();
  console.log("Attempt data in dashboard home", data);
  const userAttemptData = data?.data;
  const totalInterview = data?.data.length || 0;
  const totals = userAttemptData?.reduce(
    (
      acc: { correct: number; incorrect: number; total: number },
      item: resultType,
    ) => {
      acc.correct += item.totalCorrect;
      acc.incorrect += item.totalIncorrect;
      acc.total += item.totalAttempt;
      return acc;
    },
    {
      correct: 0,
      incorrect: 0,
      total: 0,
    },
  );
  const userSuccessRate =
    Math.round((totals?.correct / totals?.total) * 100) || 0;
  const streak = calculateStreak(
    userAttemptData?.map((attempt: resultType) => ({
      createdAt: attempt.createdAt,
    })) || [],
  );

  return {
    streak,
    isFetching,
    data,
    user,
    userSuccessRate,
    userAttemptData,
    totalInterview,
  };
}
