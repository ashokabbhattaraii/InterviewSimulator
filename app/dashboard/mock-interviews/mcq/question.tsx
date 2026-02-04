"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useCountDown } from "@/app/(public)/hooks/timer";
import useQuestion from "@/app/(public)/hooks/question";
import Quest from "./questionComponent";
import { useValidateContext } from "../../Context/ValidateContext";
import useManageResult from "@/app/(public)/hooks/result";
interface QuestionProps {
  title: string;
  content: string;
  id: string;
  index: number;
  options?: string[] | null;
}
interface resultType {
  userId: string;
  mockType: string;
  totalAttempt: number;
  totalCorrect: number;
  totalIncorrect: number;
  result: number;
}
export default function MCQInterview() {
  const { secondsLeft, minutes, seconds, start, reset } = useCountDown({
    initialSeconds: 20,
  });
  const router = useRouter();
  const {
    isSubmitted,
    setIsSubmitted,
    setLastAttempt,
    setCorrectCount,
    setInncorrectCount,
    setIsResultSubmitted,
    isResultSubmitted,
  } = useValidateContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { mutate: handleSubmit } = useManageResult();
  function manageQns(btnType: "prev" | "next" | "submit") {
    if (btnType == "next") {
      reset();
      setCurrentIndex((next) => next + 1);

      start();
      setIsSubmitted(false);
    } else if (btnType == "submit") {
      handleSubmit();
      setIsSubmitted(true);
      router.push("/dashboard/mock-interviews/mcq/result");
    } else {
      reset();
      setCurrentIndex((prev) => prev - 1);
      start();
      setIsSubmitted(false);
    }
  }
  let firstQn;
  const { data, isFetching, isLoading } = useQuestion();
  console.log(isFetching);
  console.log("First qns check", data);
  const qnsLength = data?.data?.length || 0;
  firstQn = data?.data?.[currentIndex];
  console.log("firstQn", firstQn);

  useEffect(() => {
    start();
  }, [start]);

  return (
    <div className=" p-6 text-white w-full flex justify-center items-center min-h-screen ">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          Back to Mock Interviews
          <div className="flex items-center gap-4 ">
            <div className="text-sm text-slate-400">
              Question {currentIndex + 1} of {qnsLength}
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold">{secondsLeft}</span>
            </div>
          </div>
        </div>
        {firstQn && (
          <Quest
            title={firstQn.title}
            content={firstQn.content}
            id={firstQn.id}
            options={firstQn.options ?? []}
            index={currentIndex}
          />
        )}
        <div className="mb-6">
          {!isLoading && (
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / qnsLength) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-evenly">
          <button
            disabled={currentIndex == 0}
            onClick={() => manageQns("prev")}
            className="px-6 py-3 bg-slate-800 border disabled:cursor-not-allowed border-slate-600 text-white font-semibold rounded-xl opacity-50  cursor-pointer"
          >
            Previous
          </button>

          <button
            disabled={isResultSubmitted}
            className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() =>
              currentIndex == qnsLength - 1
                ? manageQns("submit")
                : manageQns("next")
            }
          >
            {currentIndex == qnsLength - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
