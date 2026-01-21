"use client";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useValidateContext } from "../../Context/ValidateContext";
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

  const [selectedOption, setSelectedOption] = useState<string>("");
  const {
    isSubmitted,
    setIsSubmitted,
    correctCount,
    setCorrectCount,
    inncorrectCount,
    setInncorrectCount,
  } = useValidateContext();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { data, isFetching, isLoading } = useQuery<Question>({
    queryKey: ["answer", id],
    queryFn: async () => {
      const res = await fetch(`/api/answer/${id}`);
      // setSelectedOption("");
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    },
  });

  console.log("Qns and", data);

  function validateAns(selectedText: string) {
    setIsSubmitted(true);
    setSelectedOption(selectedText);

    const answer = data?.answers.find(
      (option) => option.text.trim() === selectedText.trim(),
    );

    if (answer?.isCorrect) {
      setIsCorrect(true);
      setCorrectCount(correctCount + 1);
    } else {
      setIsCorrect(false);
      setInncorrectCount(inncorrectCount + 1);
    }
    console.log("coorect,count", correctCount);
    console.log("incroorect,count", inncorrectCount);
  }

  function getButtonClass(optionText: string): string {
    let baseClass =
      "w-full text-left px-4 py-3 rounded-lg transition-all font-medium border-2 border-transparent";

    if (!isSubmitted) {
      return (
        baseClass + " bg-slate-700 text-white hover:bg-slate-600 cursor-pointer"
      );
    }

    if (selectedOption === optionText) {
      if (isCorrect) {
        return baseClass + " bg-green-600/20 border-green-500 text-green-400";
      } else {
        return baseClass + " bg-red-600/20 border-red-500 text-red-400";
      }
    }

    const answer = data?.answers.find(
      (a) => a.text.trim() === optionText.trim(),
    );
    if (answer?.isCorrect) {
      return baseClass + " bg-green-600/20 border-green-500 text-green-400";
    }

    return (
      baseClass + " bg-slate-700 text-slate-400 opacity-50 cursor-not-allowed"
    );
  }

  if (isLoading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-6">
        <p className="text-slate-400">Loading question...</p>
      </div>
    );
  }
  <span className="text-xl font-bold">{index + 1}</span>;

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 mb-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0"></div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-slate-400 text-sm">Select the correct answer</p>
        </div>
      </div>

      <div className="space-y-3">
        {data?.answers &&
          data.answers.map((option: Answer, idx: number) => (
            <button
              key={idx}
              className={getButtonClass(option.text)}
              onClick={() => !isSubmitted && validateAns(option.text.trim())}
              disabled={isSubmitted}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{String.fromCharCode(65 + idx)}</span>
                <span>{option.text}</span>
              </div>
            </button>
          ))}
      </div>

      {isSubmitted && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            isCorrect
              ? "bg-green-600/20 border border-green-500"
              : "bg-red-600/20 border border-red-500"
          }`}
        >
          <p
            className={`font-semibold ${
              isCorrect ? "text-green-400" : "text-red-400"
            }`}
          >
            {isCorrect ? "Correct Answer!" : "Incorrect Answer"}
          </p>
        </div>
      )}
    </div>
  );
}
