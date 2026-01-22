import { useAuthStore } from "@/app/(auth)/store/userAuth";

export default function DashboardHome() {
  const { user } = useAuthStore();

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border hover:border-primary/50 transition shadow-sm">
            <div className="text-muted-foreground text-xs sm:text-sm mb-2">
              Total Interviews
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-card-foreground">
              12
            </div>
            <div className="text-primary text-xs mt-2">↑ 2 this week</div>
          </div>
          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border hover:border-primary/50 transition shadow-sm">
            <div className="text-muted-foreground text-xs sm:text-sm mb-2">
              Success Rate
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-card-foreground">
              87%
            </div>
            <div className="text-primary text-xs mt-2">↑ 5% improvement</div>
          </div>
          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border hover:border-primary/50 transition shadow-sm">
            <div className="text-muted-foreground text-xs sm:text-sm mb-2">
              Streak
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-card-foreground">
              5 days
            </div>
            <div className="text-primary text-xs mt-2">Keep it up!</div>
          </div>
          <div className="bg-card rounded-lg p-4 sm:p-6 border border-border hover:border-primary/50 transition shadow-sm">
            <div className="text-muted-foreground text-xs sm:text-sm mb-2">
              Skills Mastered
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-card-foreground">
              8
            </div>
            <div className="text-secondary text-xs mt-2">3 in progress</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg p-4 sm:p-6 border border-border shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-card-foreground">
                Start New Interview
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition text-sm sm:text-base shadow-md">
                  Technical
                </button>
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition text-sm sm:text-base shadow-md">
                  Behavioral
                </button>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition text-sm sm:text-base shadow-md">
                  System Design
                </button>
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold transition text-sm sm:text-base shadow-md">
                  Mock Interview
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-border gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base text-foreground">
                  Technical Interview
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm truncate">
                  JavaScript Fundamentals
                </p>
              </div>
              <span className="text-primary text-sm sm:text-base font-semibold">
                85%
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-border gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base text-foreground">
                  Behavioral Interview
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm truncate">
                  Leadership & Teamwork
                </p>
              </div>
              <span className="text-primary text-sm sm:text-base font-semibold">
                92%
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base text-foreground">
                  Mock Interview
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm truncate">
                  Full Stack Position
                </p>
              </div>
              <span className="text-secondary text-sm sm:text-base font-semibold">
                78%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
