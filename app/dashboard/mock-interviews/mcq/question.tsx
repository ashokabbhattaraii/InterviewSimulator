"use client";
import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import useQuestion from "@/app/(public)/hooks/question";
import Quest from "./questionComponent";

interface QuestionProps {
  title: string;
  content: string;
  id: string;
  options?: string[] | null;
}

export default function MCQInterview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  function manageQns(btnType: "prev" | "next") {
    if (btnType == "next") {
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log("Prev cliecked");
    }
  }
  let firstQn;
  const { data, isFetching } = useQuestion();
  console.log(isFetching);
  console.log(data);
  const qnsLength = data?.length || 0;
  firstQn = data?.[currentIndex];

  return (
    <div className=" p-6 text-white w-full flex justify-center items-center min-h-screen ">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() =>
              (window.location.href = "/dashboard/mock-interviews")
            }
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
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
            Back to Mock Interviews
          </button>
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
              <span className="font-semibold">15:32</span>
            </div>
          </div>
        </div>
        {firstQn && (
          <Quest
            title={firstQn.title}
            content={firstQn.content}
            id={firstQn.id}
            options={firstQn.options ?? []}
          />
        )}
        <div className="mb-6">
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / qnsLength) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-evenly">
          <button
            onClick={() => manageQns("prev")}
            disabled={currentIndex == 0}
            className="px-6 py-3 bg-slate-800 border border-slate-600 text-white font-semibold rounded-xl opacity-50 cursor-not-allowed"
          >
            Previous
          </button>

          <button
            disabled={currentIndex == qnsLength - 1}
            className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg"
            onClick={() => manageQns("next")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
