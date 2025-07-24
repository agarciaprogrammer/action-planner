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
    <nav className="w-full flex items-center justify-between py-4 px-8 border-b border-accent/30 bg-card/70 backdrop-blur-[8px] shadow-vintage z-50 animate-fade-in">
      <span className="font-extrabold text-3xl tracking-widest bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,188,212,0.18)] select-none">
        AI Action Planner
      </span>
      <div className="flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="relative text-foreground/80 font-mono text-base tracking-wide px-3 py-1 rounded transition hover:bg-accent/20 hover:shadow-[0_0_8px_0_rgba(0,188,212,0.12)] focus:outline-none focus:ring-2 focus:ring-accent2 focus:ring-offset-2 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-accent2 after:transition-all after:duration-300 hover:after:w-full after:rounded"
          >
            {l.label}
          </a>
        ))}
        <button
          aria-label="Toggle Dark Mode"
          className="ml-6 rounded-full p-2 border-2 border-accent2 bg-background/80 shadow hover:shadow-accent2/40 transition relative overflow-hidden group"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className="text-2xl transition-transform duration-300 group-hover:scale-125">
            {theme === "dark" ? "🌙" : "☀️"}
          </span>
          <span className="absolute inset-0 pointer-events-none animate-water-glow" />
        </button>
      </div>
    </nav>
  );
}

// Animación de agua para el botón de tema
// Agrega en globals.css:
// @keyframes water-glow { 0% { box-shadow: 0 0 0 0 #00bcd455; } 100% { box-shadow: 0 0 24px 12px #00bcd433; } }
// .animate-water-glow { animation: water-glow 2s infinite alternate; border-radius: 9999px; }
// .animate-fade-in { animation: fade-in 1.2s cubic-bezier(.4,0,.2,1); }
// @keyframes fade-in { from { opacity: 0; transform: translateY(-16px);} to { opacity: 1; transform: none; } } 