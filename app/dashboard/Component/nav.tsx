"use client";
import Image from "next/image";
import { Bell } from "lucide-react";
import { useAuthStore } from "@/app/(auth)/store/userAuth";
export default function Nav() {
  const { user } = useAuthStore();
  console.log("Userdata", user);
  return (
    <>
      <div
        id="nav"
        className="fixed top-0 left-0 bg-slate-900 flex items-center w-full"
      >
        <div id="logo" className="ml-6 hover:scale-105 cursor-pointer ">
          <Image src="/logo.png" width={80} height={80} alt="logo"></Image>
        </div>
        <div className="flex ml-auto mr-10 gap-6 justify-center items-center">
          <div id="notification" className="text-white">
            <Bell></Bell>
          </div>
          <div
            id="profile"
            className="w-10 h-10 rounded-full bg-blue-600 flex justify-center items-center"
          >
            <p>H</p>
          </div>
        </div>
      </div>
    </>
  );
}
