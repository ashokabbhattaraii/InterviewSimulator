"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
interface QuestionProps {
  title: string;
  content: string;
  id: string;
  index: number;
  options?: string[] | null;
}

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}
interface Question {
  id: string;
  title: string;
  answers: Answer[];
}
export default function Quest({
  title,
  content,
  id,
  options,
  index,
}: QuestionProps) {
  const parsedOptions =
    typeof options === "string" ? JSON.parse(options) : options;
  console.log("from each qns", title);
  console.log("from each qns", content);
  console.log("from each qns", id);
  console.log("option each qns", parsedOptions);

  const { data, isFetching, isLoading } = useQuery<Question>({
    queryKey: ["answer", id],
    queryFn: async () => {
      const res = await fetch("/dashboard/fetch/qnsAns");
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    },
  });
  console.log("Qns and", data);
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
          <span className="text-xl font-bold">{index + 1}</span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-slate-400 text-sm">Select the correct answer</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Add your options here */}
        {parsedOptions &&
          parsedOptions.map((option: string, index: number) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
            >
              {option}
            </button>
          ))}
      </div>
    </div>
  );
}
