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
import Profile from "./Menus/profile";
import { useAuthStore } from "@/app/(auth)/store/userAuth";
export default function SideBar() {
  const [selected, setSelected] = useState("dashboard");
  const [toogleMenu, setToogleMenu] = useState(true);
  const options = [
    { name: "Dashboard", icon: <Home /> },
    { name: "Mock Interviews", icon: <Mic /> },
    { name: "Profile", icon: <User /> },
    { name: "Feedback", icon: <ClipboardCheck /> },
    { name: "Settings", icon: <Settings /> },
  ];
  const selectedClass = "border-r-3 border-primary";
  const { user } = useAuthStore();
  async function logout() {
    await signOut();
  }

  return (
    <>
      <div className=" flex min-h-screen gap-6">
        <aside
          className={`${
            toogleMenu ? "w-64" : "w-18 flex items-center justify-center"
          } pt-20 flex justify-start fixed flex-col bg-sidebar text-sidebar-foreground min-h-screen transition-all ease-out duration-300 border-r border-sidebar-border`}
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
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/20 hover:text-sidebar-foreground"
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
            className="mt-auto ml-auto mb-3 mr-4 flex gap-2 text-sidebar-foreground cursor-pointer justify-center items-center hover:text-sidebar-foreground/80 font-bold"
            onClick={logout}
          >
            <LogOut></LogOut>
            {toogleMenu ? "LogOut" : ""}
          </span>
        </aside>
        <div
          className={`${toogleMenu ? "ml-64" : "ml-18"} flex pt-22 w-full px-6 transition-all ease-in-out duration-200`}
        >
          {selected === "dashboard" && <DashboardHome />}
          {selected === "mock interviews" && <MockInterviews />}
          {selected === "profile" && <Profile user={user} />}
          {selected === "feedback" && <DashboardHome />}
          {selected === "settings" && <SettingsMenu />}
        </div>
      </div>
    </>
  );
}
