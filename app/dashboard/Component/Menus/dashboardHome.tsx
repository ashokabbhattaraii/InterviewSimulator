import { useAuthStore } from "@/app/(auth)/store/userAuth";
import { getAttemptResult } from "@/app/(public)/hooks/result";
import calculateStreak from "../calculateStreak";
import { MockType } from "@/prisma/generated/client/edge";
import { useRouter } from "next/navigation";
import UserResult from "../userResult";
interface resultType {
  userId: string;
  mockType: MockType;
  totalAttempt: number;
  totalCorrect: number;
  totalIncorrect: number;
  result: number;
  createdAt?: string | Date;
}

export default function DashboardHome() {
  const router = useRouter();
  const { streak, isFetching, data, user, userSuccessRate, userAttemptData } =
    UserResult();
  const getResultColor = (result: number) => {
    if (result >= 80) return "text-primary";
    if (result >= 60) return "text-secondary";
    return "text-destructive";
  };

  console.log("User streak:", streak);

  return (
    <div className="min-h-screen w-full max-w-8xl bg-background text-foreground transition-all ease-in-out duration-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Welcome back,{" "}
            <span className="text-primary animate-pulse">
              {user?.user_metadata.firstName}
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Ready to ace your next interview?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div
            className={`bg-card rounded-lg p-4 sm:p-6 border border-border hover:border-primary/50 transition shadow-sm ${isFetching ? "animate-pulse" : ""}`}
          >
            <div className="text-muted-foreground text-xs sm:text-sm mb-2">
              Total Interviews
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-card-foreground">
              {isFetching ? (
                <div className="h-8 bg-muted rounded w-12 animate-pulse"></div>
              ) : (
                data?.data.length || 0
              )}
            </div>
            <div className="text-primary text-xs mt-2">
              {isFetching ? "Loading..." : "↑ 2 this week"}
            </div>
          </div>

          <div
            className={`bg-card rounded-lg p-4 sm:p-6 border border-border hover:border-primary/50 transition shadow-sm ${isFetching ? "animate-pulse" : ""}`}
          >
            <div className="text-muted-foreground text-xs sm:text-sm mb-2">
              Success Rate
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-card-foreground ">
              {isFetching ? (
                <div className="h-8 bg-muted rounded w-12 animate-pulse"></div>
              ) : (
                `${userSuccessRate}%`
              )}
            </div>
            <div className="text-primary text-xs mt-2 ">
              {isFetching ? "Loading..." : "↑ 5% improvement"}
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border hover:border-primary/50 transition shadow-sm">
            <div className="text-muted-foreground text-xs sm:text-sm mb-2">
              Current Streak
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-card-foreground">
              {isFetching ? (
                <div className="h-8 bg-muted rounded w-12 animate-pulse"></div>
              ) : (
                streak
              )}
            </div>
            {isFetching ? (
              <div className="text-primary text-xs mt-2 ">Loading...</div>
            ) : (
              "Keep it up!"
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg p-4 sm:p-6 border border-border shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-card-foreground">
                Start New Interview
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition text-sm sm:text-base shadow-md cursor-pointer"
                  onClick={() => router.push("/dashboard/mock-interviews/mcq")}
                >
                  MCQ
                </button>
                <button
                  disabled
                  className="bg-muted text-muted-foreground cursor-not-allowed py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold opacity-50 text-sm sm:text-base shadow-md"
                  title="Coming Soon"
                >
                  Technical <span className="text-xs">(Soon)</span>
                </button>
                <button
                  disabled
                  className="bg-muted text-muted-foreground cursor-not-allowed py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold opacity-50 text-sm sm:text-base shadow-md"
                  title="Coming Soon"
                >
                  Behavioral <span className="text-xs">(Soon)</span>
                </button>
                <button
                  disabled
                  className="bg-muted text-muted-foreground cursor-not-allowed py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold opacity-50 text-sm sm:text-base shadow-md"
                  title="Coming Soon"
                >
                  System Design <span className="text-xs">(Soon)</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-card-foreground">
              Quick Links
            </h2>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="#"
                className="block p-2 sm:p-3 bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground rounded-lg transition text-sm sm:text-base"
              >
                View Reports
              </a>
              <a
                href="#"
                className="block p-2 sm:p-3 bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground rounded-lg transition text-sm sm:text-base"
              >
                Practice Areas
              </a>
              <a
                href="#"
                className="block p-2 sm:p-3 bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground rounded-lg transition text-sm sm:text-base"
              >
                Settings
              </a>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 sm:p-6 border border-border shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-card-foreground">
            Recent Activity
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {isFetching ? (
              <div className="text-muted-foreground text-sm">Loading...</div>
            ) : userAttemptData && userAttemptData.length > 0 ? (
              userAttemptData
                .slice(-3)

                .map((attempt: resultType, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-border gap-2 last:border-b-0"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-foreground capitalize">
                        {attempt.mockType.replace(/_/g, " ")}
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm truncate">
                        {new Date(
                          attempt?.createdAt || "",
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`text-sm sm:text-base font-semibold ${getResultColor(attempt.result)}`}
                    >
                      {Math.round(attempt.result)}%
                    </span>
                  </div>
                ))
            ) : (
              <div className="text-muted-foreground text-sm">
                No attempts yet. Start your first interview!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
