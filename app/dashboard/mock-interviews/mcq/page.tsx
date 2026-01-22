"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Question from "./question";
import { useValidateContext } from "../../Context/ValidateContext";
export default function MCQ() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ difficulty: string }>();
  const {
    isDifficultySelected,
    setIsDifficultySelected,
    setDifficultyLevel,
    difficultyLevel,
  } = useValidateContext();

  function onSelectedOption(data: { difficulty: string }) {
    console.log("Btn clicked", data.difficulty);
    setDifficultyLevel(data.difficulty.toLowerCase().trim());
    setIsDifficultySelected(true);
  }

  return (
    <>
      {isDifficultySelected && <Question />}
      {!isDifficultySelected && (
        <div className=" fixed inset-0 text-foreground flex justify-center items-center min-h-screen bg-background/80 backdrop-blur-sm">
          <div className="bg-primary p-6 rounded-2xl shadow-lg shadow-primary/50">
            <h1 className="text-2xl mb-6 text-primary-foreground">
              Select the level of{" "}
              <span className="font-bold uppercase text-secondary">
                Difficulty
              </span>
            </h1>
            <form
              className="flex flex-col gap-6 justify-center items-center"
              onSubmit={handleSubmit(onSelectedOption)}
            >
              <div className="flex gap-6 text-primary-foreground">
                <label className="flex items-center gap-2 cursor-pointer hover:text-background transition-colors">
                  <input
                    type="radio"
                    value="Easy"
                    {...register("difficulty")}
                    className="accent-secondary"
                  />
                  Easy
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-background transition-colors">
                  <input
                    type="radio"
                    defaultChecked
                    value="Medium"
                    {...register("difficulty")}
                    className="accent-secondary"
                  />
                  Medium
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-background transition-colors">
                  <input
                    type="radio"
                    value="Hard"
                    {...register("difficulty")}
                    className="accent-secondary"
                  />
                  Hard
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-secondary py-3 rounded-2xl mt-4 font-bold text-secondary-foreground
                       shadow-lg shadow-secondary/50
                       hover:shadow-xl hover:bg-secondary/90
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
