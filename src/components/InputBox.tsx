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
    } catch (err) {
      setError("No se pudo generar el plan. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="border rounded px-4 py-2 text-lg dark:bg-black dark:text-white"
          placeholder="¿Cuál es tu meta? (ej: Aprender TypeScript en 1 semana)"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Generando..." : "Generar"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {plan && <PlanViewer plan={plan} />}
    </div>
  );
} 