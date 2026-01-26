"use client";
import Image from "next/image";
import { Bell } from "lucide-react";
import Nav from "./Component/nav";
import { useAuthStore } from "../(auth)/store/userAuth";
import { useEffect } from "react";
import createClient from "@/lib/client/client";
import SideBar from "./Component/sidebar";
export default function Dashboard() {
  const { setUser, user } = useAuthStore();
  useEffect(() => {
    async function saveUser() {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(typeof user);
      setUser(user);
      // console.log(typeof user, user);
    }
    saveUser();
    // console.log("Logged in from dashboard", user, typeof user);
  }, []);
  return (
    <>
      <div className="bg-background w-full min-h-screen text-foreground">
        <Nav />
        <SideBar />
      </div>
    </>
  );
}
