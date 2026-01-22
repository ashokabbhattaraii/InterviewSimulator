import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/app/api/questions/getQuestions";

import { useValidateContext } from "@/app/dashboard/Context/ValidateContext";
export default function useQuestion() {
  const { difficultyLevel } = useValidateContext();
  return useQuery({
    queryKey: ["questions", difficultyLevel],
    queryFn: () => getQuestions(difficultyLevel),
    enabled: !!difficultyLevel,
  });
}

export function GetAllQuestions() {
  return useQuery({
    queryKey: ["all-questions"],

    queryFn: async () => {
      const res = await fetch(`/api/allQuestion`, {
        method: "GET",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch all questions");
      }
      return res.json();
    },
  });
}
