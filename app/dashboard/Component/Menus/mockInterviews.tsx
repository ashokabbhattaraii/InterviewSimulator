"use client";
import Link from "next/link";

export default function MockInterviews() {
  const interviewTypes = [
    {
      href: "/dashboard/mock-interviews/mcq",
      gradient: "from-blue-500 to-blue-600",
      hoverBorder: "hover:border-blue-500/50",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
      title: "MCQ Test",
      description: "Multiple choice questions to test your knowledge",
      duration: "50+ Questions",
      arrowColor: "text-blue-400",
      comingSoon: false,
    },
    {
      href: "/dashboard/mock-interviews/behavioral",
      gradient: "from-purple-500 to-purple-600",
      hoverBorder: "hover:border-purple-500/50",
      icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
      title: "Behavioral Interview",
      description: "Practice answering behavioral questions with STAR method",
      duration: "30 min session",
      arrowColor: "text-purple-400",
      comingSoon: true,
    },
    {
      href: "/dashboard/mock-interviews/coding",
      gradient: "from-green-500 to-green-600",
      hoverBorder: "hover:border-green-500/50",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      title: "Technical Coding",
      description: "Solve coding problems and algorithms",
      duration: "45 min session",
      arrowColor: "text-green-400",
      comingSoon: true,
    },
    {
      href: "/dashboard/mock-interviews/system-design",
      gradient: "from-amber-500 to-amber-600",
      hoverBorder: "hover:border-amber-500/50",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      title: "System Design",
      description: "Design scalable systems and architectures",
      duration: "60 min session",
      arrowColor: "text-amber-400",
      comingSoon: true,
    },
    {
      href: "/dashboard/mock-interviews/video",
      gradient: "from-pink-500 to-pink-600",
      hoverBorder: "hover:border-pink-500/50",
      icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
      title: "Video Interview",
      description: "Practice with AI-powered video interview simulation",
      duration: "Live session",
      arrowColor: "text-pink-400",
      comingSoon: true,
    },
    {
      href: "/dashboard/mock-interviews/custom",
      gradient: "from-cyan-500 to-cyan-600",
      hoverBorder: "hover:border-cyan-500/50",
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
      title: "Custom Interview",
      description: "Create your own personalized interview session",
      duration: "Flexible",
      arrowColor: "text-cyan-400",
      comingSoon: true,
    },
  ];

  return (
    <div className="flex-1 p-6 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mock Interviews</h1>
        <p className="text-slate-400">
          Choose your interview type and start practicing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviewTypes.map((interview) => (
          <div key={interview.href} className="relative">
            {interview.comingSoon ? (
              <div
                className={`bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 ${interview.hoverBorder} transition-all cursor-not-allowed block opacity-60`}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${interview.gradient} rounded-xl flex items-center justify-center mb-4`}
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={interview.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {interview.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {interview.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <span className="text-xs text-slate-500">
                    {interview.duration}
                  </span>
                  <svg
                    className={`w-5 h-5 ${interview.arrowColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <Link
                href={interview.href}
                className={`bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 ${interview.hoverBorder} transition-all cursor-pointer group block`}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${interview.gradient} rounded-xl flex items-center justify-center mb-4`}
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={interview.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {interview.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {interview.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <span className="text-xs text-slate-500">
                    {interview.duration}
                  </span>
                  <svg
                    className={`w-5 h-5 ${interview.arrowColor} group-hover:translate-x-1 transition-transform`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            )}
            {interview.comingSoon && (
              <div className="absolute top-4 right-4 bg-amber-500/20 border border-amber-500/50 rounded-lg px-3 py-1">
                <span className="text-amber-400 text-xs font-semibold">
                  Coming Soon
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Need help choosing?
            </h3>
            <p className="text-slate-300 text-sm">
              Take our quick assessment to find the best interview type for you
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg">
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
