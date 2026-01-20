import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/app/api/questions/getQuestions";
export default function useQuestion() {
  return useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });
}
