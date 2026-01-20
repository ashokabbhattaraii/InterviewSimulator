"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Question from "./question";
export default function MCQ() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ difficulty: string }>();
  const [isDifficultySelected, setIsDifficultySelected] = useState(false);
  function onSelectedOption(data: { difficulty: string }) {
    console.log("Btn clicked", data.difficulty);
    setIsDifficultySelected(true);
  }

  return (
    <>
      <div className="text-white w-full ">
        <Question></Question>
      </div>
      {isDifficultySelected && (
        <div className=" fixed inset-0 text-white flex justify-center items-center min-h-screen">
          <div className="bg-blue-600 p-6 rounded-2xl shadow-lg shadow-green-400/50">
            <h1 className="text-2xl mb-6">
              Select the level of{" "}
              <span className="font-bold uppercase text-black">Difficulty</span>
            </h1>
            <form
              className="flex flex-col gap-6 justify-center items-center"
              onSubmit={handleSubmit(onSelectedOption)}
            >
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Easy"
                    {...register("difficulty")}
                  />
                  Easy
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    defaultChecked
                    value="Medium"
                    {...register("difficulty")}
                  />
                  Medium
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Hard"
                    {...register("difficulty")}
                  />
                  Hard
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-black py-3 rounded-2xl mt-4 font-bold text-white
                       shadow-lg shadow-slate-400/50
                       hover:shadow-xl hover:shadow-slate-200/60
                       hover:scale-105 transition-all duration-300"
              >
                Start
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
