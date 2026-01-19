"use client";
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({
  text,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "rounded-xl px-6 py-3 font-semibold transition-all duration-200";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-900/50 hover:scale-105 active:scale-95",
    secondary:
      "bg-slate-800 border border-slate-600 text-white hover:bg-slate-700 hover:border-slate-500",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      {text}
    </button>
  );
}
