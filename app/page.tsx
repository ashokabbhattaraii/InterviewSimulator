"use client";
import Info from "./(public)/components/HomeComponents/info";
import Register from "./(public)/register/page";
import { useAuthStore } from "./(auth)/store/userAuth";
import createClient from "@/lib/client/client";
import { useEffect } from "react";
export default function Home() {
  return (
    <main>
      <Info></Info>
    </main>
  );
}
