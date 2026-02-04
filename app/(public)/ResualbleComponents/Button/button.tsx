"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  text,
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-xl px-6 py-3 font-semibold transition-all duration-200 flex items-center justify-center";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:scale-105 active:scale-95",
    secondary:
      "bg-card border border-primary text-primary hover:bg-primary/10",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {text || children}
    </button>
  );
}
