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
  difficulty: string;
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
    difficultyLevel,
  } = useValidateContext();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  let initialCount = 0;
  const { data, isFetching, isLoading } = useQuery<Question>({
    queryKey: ["answer", id, difficultyLevel.toUpperCase()],
    queryFn: async () => {
      const res = await fetch(
        `/api/answer/${id}?difficulty=${difficultyLevel.toUpperCase()}`,
        {
          method: "GET",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      return data;
    },
  });

  console.log("Qns and", data);
  console.log("difficultyLevel", data?.difficulty);

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
        baseClass + " bg-muted text-foreground hover:bg-muted/80 cursor-pointer"
      );
    }

    if (selectedOption === optionText) {
      if (isCorrect) {
        return baseClass + " bg-green-500/20 border-green-500 text-green-600";
      } else {
        return (
          baseClass + " bg-destructive/20 border-destructive text-destructive"
        );
      }
    }

    const answer = data?.answers.find(
      (a) => a.text.trim() === optionText.trim(),
    );
    if (answer?.isCorrect) {
      return baseClass + " bg-green-600/20 border-green-500 text-green-400";
    }

    return (
      baseClass +
      " bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
    );
  }

  if (isLoading) {
    return (
      <div className="bg-card backdrop-blur-xl rounded-2xl p-8 border border-border mb-6">
        <p className="text-muted-foreground">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="bg-card backdrop-blur-xl rounded-2xl p-8 border border-border mb-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
          {" "}
          <span className="text-xl font-bold">{index + 1}</span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-card-foreground mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm">
            Select the correct answer
          </p>
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
              ? "bg-green-500/20 border border-green-500"
              : "bg-destructive/20 border border-destructive"
          }`}
        >
          <p
            className={`font-semibold ${
              isCorrect ? "text-green-500" : "text-destructive"
            }`}
          >
            {isCorrect ? "Correct Answer!" : "Incorrect Answer"}
          </p>
        </div>
      )}
    </div>
  );
}
