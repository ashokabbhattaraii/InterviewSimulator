"use client";
import Image from "next/image";
import { Bell, LogOut } from "lucide-react";
import { useAuthStore } from "@/app/(auth)/store/userAuth";
import { useState } from "react";
import { signOut } from "@/app/(auth)/AuthActions/auth";
import { ThemeToggle } from "@/app/(public)/components/toogleComponent/toogle";
export default function Nav() {
  const { user } = useAuthStore();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  const firstLetter =
    user?.user_metadata?.firstName?.charAt(0)?.toUpperCase() || "U";
  const fullName =
    `${user?.user_metadata?.firstName || ""} ${user?.user_metadata?.lastName || ""}`.trim();

  return (
    <>
      <div
        id="nav"
        className="fixed z-50 top-0 left-0 bg-slate-900/95 backdrop-blur-sm flex items-center w-full border-b border-slate-800"
      >
        <div id="logo" className="ml-6 hover:scale-105 cursor-pointer">
          <Image src="/logo.png" width={80} height={80} alt="logo" />
        </div>

        <div className="flex ml-auto mr-10 gap-6 justify-center items-center">
          <ThemeToggle></ThemeToggle>
          <div
            id="notification"
            className="text-white hover:text-blue-400 cursor-pointer transition-colors"
          >
            <Bell size={24} />
          </div>
          <div className="relative">
            <button
              id="profile"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex justify-center items-center text-white font-bold text-lg hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg cursor-pointer"
            >
              {firstLetter}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-700">
                  <p className="text-white font-semibold text-sm">{fullName}</p>
                  <p className="text-slate-400 text-xs">{user?.email}</p>
                </div>

                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </button>

                  <button className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Help & Support
                  </button>
                </div>

                <div className="border-t border-slate-700 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-600/20 transition-colors text-sm flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
