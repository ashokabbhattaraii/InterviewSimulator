"use client";
import Info from "./(public)/components/HomeComponents/info";
import Register from "./(public)/register/page";
import { useAuthStore } from "./(auth)/store/userAuth";
import createClient from "@/lib/client/client";
import { useEffect } from "react";
import Stats from "./(public)/components/HomeComponents/stats";
import { getUsers } from "./(auth)/AuthActions/auth";
import Features from "./(public)/components/HomeComponents/features";
import AboutUs from "./(public)/components/HomeComponents/about-us";
export default function Home() {
  return (
    <main>
      <Info />
      <Stats />
      <Features />
      <AboutUs />
    </main>
  );
}
