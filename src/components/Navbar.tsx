"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const links = [
  { href: "#", label: "Planes guardados" },
  { href: "#", label: "Sobre" },
  { href: "#", label: "Contacto" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 border-b border-accent bg-background/95 backdrop-blur shadow-vintage z-50">
      <span className="font-extrabold text-2xl tracking-widest text-accent drop-shadow-[0_2px_4px_rgba(255,92,92,0.25)] select-none">
        <span className="text-accent2">AI</span> Action <span className="text-accent3">Planner</span>
      </span>
      <div className="flex items-center gap-6">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="relative text-foreground/80 font-mono text-sm tracking-wider px-2 py-1 transition hover:text-accent2 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-accent2 after:transition-all after:duration-300 hover:after:w-full after:rounded"
          >
            {l.label}
          </a>
        ))}
        <button
          aria-label="Toggle Dark Mode"
          className="ml-4 rounded-full p-2 border-2 border-accent2 bg-background shadow hover:shadow-accent2/40 transition"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className="text-xl">
            {theme === "dark" ? "🌙" : "☀️"}
          </span>
        </button>
      </div>
    </nav>
  );
} 