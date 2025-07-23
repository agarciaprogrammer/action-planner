"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
      <span className="font-bold text-lg tracking-tight">AI Action Planner</span>
      <button
        aria-label="Toggle Dark Mode"
        className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
    </nav>
  );
} 