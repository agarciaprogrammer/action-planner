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
    <div className="w-full max-w-3xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center bg-card/80 p-6 rounded-xl shadow-vintage border border-border">
        <textarea
          className="border-2 border-accent2 bg-background/80 text-foreground rounded-lg px-4 py-3 text-xl font-mono focus:outline-none focus:border-accent3 transition w-full placeholder:text-accent3/60 shadow-sm max-w-2xl"
          placeholder="Ej: Aprender a programar en 7 días, Lanzar mi primer podcast, etc."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          required
          disabled={loading}
          rows={3}
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-accent2 text-background rounded-lg px-8 py-3 font-extrabold text-lg tracking-widest shadow hover:bg-accent3 hover:text-accent2 transition border-2 border-accent2 hover:border-accent3 focus:outline-none focus:ring-2 focus:ring-accent3 focus:ring-offset-2 max-w-2xl cursor-pointer"
          disabled={loading}
        >
          {loading ? "Generando..." : "GENERAR"}
        </button>
      </form>
      {error && <p className="text-accent mt-4 text-center font-mono animate-pulse">{error}</p>}
      {plan && <PlanViewer plan={plan} />}
    </div>
  );
} 