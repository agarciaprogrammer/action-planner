"use client";
import { useState } from "react";
import PlanViewer from "@/components/PlanViewer";
import { Plan } from "@/types/plan";

export default function InputBox() {
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPlan(null);
    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("Error generando el plan");
      const data = await res.json();
      setPlan(data);
    } catch {
      setError("No se pudo generar el plan. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-fade-in">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center bg-card/80 p-8 rounded-2xl shadow-vintage border border-border backdrop-blur-[8px]">
        <textarea
          className="border-2 border-accent2 bg-background/80 text-foreground rounded-xl px-6 py-4 text-xl font-mono focus:outline-none focus:border-accent transition w-full placeholder:text-accent/60 shadow-sm max-w-2xl resize-vertical min-h-[72px] backdrop-blur-[4px]"
          placeholder="Ej: Aprender a programar en 7 días, Lanzar mi primer podcast, etc."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          required
          disabled={loading}
          rows={3}
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-accent via-accent2 to-accent3 text-background rounded-xl px-10 py-4 font-extrabold text-lg tracking-widest shadow-lg hover:shadow-accent2/40 transition border-2 border-accent2 hover:border-accent3 focus:outline-none focus:ring-2 focus:ring-accent3 focus:ring-offset-2 max-w-2xl cursor-pointer relative overflow-hidden group animate-fade-in animate-delay-200"
          disabled={loading}
        >
          <span className="relative z-10">{loading ? "Generando..." : "GENERAR"}</span>
          <span className="absolute inset-0 pointer-events-none animate-water-glow" />
        </button>
      </form>
      {error && <p className="text-accent mt-4 text-center font-mono animate-pulse animate-delay-300">{error}</p>}
      {plan && <PlanViewer plan={plan} />}
    </div>
  );
} 