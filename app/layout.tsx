"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextProvider } from "./dashboard/Context/ValidateContext";
import "./globals.css";
import NavBar from "./(public)/components/navabr/navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientQuery = new QueryClient();
  const pathname = usePathname();
  const isDashbaord = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isDashbaord && !isAdmin && <NavBar />}
        <QueryClientProvider client={clientQuery}>
          <ContextProvider>{children}</ContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
