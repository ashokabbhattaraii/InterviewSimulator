"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextProvider } from "./dashboard/Context/ValidateContext";
import { ThemeToggle } from "./(public)/components/toogleComponent/toogle";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NavBar from "./(public)/components/navabr/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Create QueryClient outside component
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  const isAuth =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="system"
          >
            <ContextProvider>
              {!isDashboard && !isAdmin && !isAuth && <NavBar />}
              {children}
              <ThemeToggle />
            </ContextProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
