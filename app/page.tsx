"use client";
import Info from "./(public)/components/HomeComponents/info";
import Register from "./(public)/register/page";
import { useAuthStore } from "./(auth)/store/userAuth";
import createClient from "@/lib/client/client";
import { useEffect, useState } from "react";
import Stats from "./(public)/components/HomeComponents/stats";
import { getUsers } from "./(auth)/AuthActions/auth";
import Features from "./(public)/components/HomeComponents/features";
import AboutUs from "./(public)/components/HomeComponents/about-us";

export default function Home() {
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers(1);
      console.log("Fetched users:", response);
      if (response.success && response.total) {
        setTotalUsers(response.total);
      }
    };

    fetchUsers();
  }, []);
  return (
    <main>
      <Info />
      <Stats totalUsers={totalUsers} />
      <Features />
      <AboutUs />
    </main>
  );
}
