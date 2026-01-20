"use client";
import { icons } from "lucide-react";
import {
  Home,
  Menu,
  Settings,
  User,
  ClipboardCheck,
  LogOut,
  Mic,
} from "lucide-react";
import { useState } from "react";
import DashboardHome from "./Menus/dashboardHome";
import { signOut } from "@/app/(auth)/AuthActions/auth";
import SettingsMenu from "./Menus/settings";
import MockInterviews from "./Menus/mockInterviews";
export default function SideBar() {
  const [selected, setSelected] = useState("dashboard");
  const [toogleMenu, setToogleMenu] = useState(false);
  const options = [
    { name: "Dashboard", icon: <Home></Home> },
    { name: "Mock Interviews", icon: <Mic></Mic> },
    { name: "Profle", icon: <User></User> },
    { name: "Feedback", icon: <ClipboardCheck></ClipboardCheck> },
    { name: "Settings", icon: <Settings></Settings> },
  ];
  const selectedClass = "border-r-3 border-red-600";

  async function logout() {
    await signOut();
  }

  return (
    <>
      <div className="flex min-h-screen gap-6">
        <aside
          className={`${
            toogleMenu ? "w-64" : "w-18 flex items-center justify-center"
          } pt-20 flex justify-start flex-col bg-blue-600  min-h-screen transition-all ease-out duration-300 `}
        >
          <span className="ml-auto my-4 h-15 w-15 ">
            <Menu size={40} onClick={() => setToogleMenu(!toogleMenu)}></Menu>
          </span>
          <div className="flex flex-col justify-center mx-7 gap-6 items-center">
            {options.map((item, i) => {
              return (
                <button
                  key={item.name}
                  onClick={() => setSelected(item.name.toLowerCase())}
                  className={`w-full flex justify-center items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    selected === item.name.toLowerCase()
                      ? "bg-gradient-to-r from-blue-900/80 to-blue-500 text-white border border-blue-500"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  } font-bold`}
                >
                  <span className="">{item.icon}</span>
                  {toogleMenu && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
          <span
            className="mt-auto ml-auto mb-3 mr-4 flex gap-2 text-white cursor-pointer justify-center items-center hover:text-slate-400 font-bold"
            onClick={logout}
          >
            <LogOut></LogOut>
            {toogleMenu ? "LogOut" : ""}
          </span>
        </aside>
        <div className="flex pt-22">
          {selected == "dashboard" && <DashboardHome></DashboardHome>}
          {selected == "mock interviews" && <MockInterviews></MockInterviews>}
          {selected == "profile" && <DashboardHome></DashboardHome>}
          {selected == "feedback" && <DashboardHome></DashboardHome>}
          {selected == "settings" && <SettingsMenu></SettingsMenu>}
        </div>
      </div>
    </>
  );
}
