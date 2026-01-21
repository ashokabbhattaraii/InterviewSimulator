"use client";
import { useRouter } from "next/navigation";
import { useValidateContext } from "@/app/dashboard/Context/ValidateContext";
import { useAuthStore } from "@/app/(auth)/store/userAuth";
import { useEffect } from "react";
import createClient from "@/lib/client/client";
export default function Result() {
  const { setUser, user } = useAuthStore();
  useEffect(() => {
    async function saveUser() {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(typeof user);
      setUser(user);
      console.log(typeof user, user);
    }
    saveUser();
    console.log("Logged in from dashboard", user, typeof user);
  }, []);
  console.log(user, "from result");
  const router = useRouter();
  const { correctCount, inncorrectCount, isSubmitted } = useValidateContext();
  const total = correctCount + inncorrectCount;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const firstName = user?.user_metadata?.firstName || "User";

  const getPerformanceColor = () => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent Performance!";
    if (percentage >= 60) return "Good Job!";
    return "Keep Practicing!";
  };
  if (!isSubmitted) return router.replace("/404");
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center">
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
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
        Home
      </button>

      <div className="w-full max-w-2xl">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
            <h1 className="text-3xl font-bold text-white relative z-10">
              Quiz Complete!
            </h1>
            <p className="text-blue-200 mt-1 text-sm relative z-10">
              Here's how you performed
            </p>
          </div>

          <div className="px-8 py-6 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-400">
                Congratulations,{" "}
                <span className="text-white">
                  {user?.user_metadata.firstName}
                </span>
                ! 🎉
              </h2>
            </div>

            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 200 200"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="8"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 90 * (percentage / 100)} ${2 * Math.PI * 90}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={`text-3xl font-bold ${getPerformanceColor()}`}
                  >
                    {percentage}%
                  </span>
                  <span className="text-slate-400 text-xs mt-1">Score</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className={`text-xl font-bold ${getPerformanceColor()} mb-2`}>
                {getPerformanceMessage()}
              </h2>
              <p className="text-slate-400 text-sm">
                You answered {correctCount} out of {total} questions correctly
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-700/50 rounded-lg p-4 text-center border border-slate-600">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {correctCount}
                </div>
                <div className="text-slate-400 text-xs">Correct</div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 text-center border border-slate-600">
                <div className="text-2xl font-bold text-slate-400 mb-1">
                  {total}
                </div>
                <div className="text-slate-400 text-xs">Total</div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 text-center border border-slate-600">
                <div className="text-2xl font-bold text-red-400 mb-1">
                  {inncorrectCount}
                </div>
                <div className="text-slate-400 text-xs">Incorrect</div>
              </div>
            </div>

            <button
              onClick={() => router.push("/dashboard/mock-interviews")}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg"
            >
              Back to Interviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
