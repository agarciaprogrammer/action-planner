"use client";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Plan, Step } from "../../src/types/plan";
import { pdf } from "@react-pdf/renderer";
import PlanPDFDocument from "@/components/PlanPDFDocument";

interface Props {
  plan: Plan;
}

function StepItem({
  step,
  onChange,
  id,
}: {
  step: Step;
  onChange: (field: keyof Step, value: string | number) => void;
  id: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`p-5 rounded-xl border-2 border-accent2 bg-card shadow-vintage flex flex-col gap-2 relative transition-shadow duration-200 ${isDragging ? "shadow-2xl z-10 border-accent3" : ""}`}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <input
          className="font-bold text-lg mb-1 bg-transparent border-b-2 border-dashed border-accent2 focus:border-accent3 outline-none flex-1 min-w-0 text-accent2"
          value={step.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
        <div className="flex gap-4 items-center text-sm">
          <label>
            ⏱️
            <input
              type="number"
              min={1}
              max={40}
              className="w-12 ml-1 bg-transparent border-b-2 border-dashed border-accent2 focus:border-accent3 outline-none text-right text-accent3"
              value={step.estimatedHours}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (!isNaN(val) && val >= 1 && val <= 40) {
                  onChange("estimatedHours", val);
                }
              }}
            />
            h
          </label>
          <label>
            📅
            <input
              type="date"
              className="ml-1 bg-transparent border-b-2 border-dashed border-accent2 focus:border-accent3 outline-none text-accent3"
              value={step.deadline}
              onChange={(e) => onChange("deadline", e.target.value)}
            />
          </label>
        </div>
      </div>
      <p className="mb-2 text-foreground/80 font-mono">{step.description}</p>
      {step.resources.length > 0 && (
        <ul className="list-disc list-inside text-accent3 font-mono">
          {step.resources.map((r, i) => (
            <li key={i}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent2 transition">
                {r.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 cursor-grab text-2xl select-none opacity-80 pl-2 transition-transform duration-200 hover:scale-125 text-accent2">
        ☰
      </span>
    </li>
  );
}

export default function PlanViewer({ plan }: Props) {
  const [steps, setSteps] = useState<Step[]>(plan.steps || []);
  const [title, setTitle] = useState(plan.title || "");
  const [exporting, setExporting] = useState(false);

  // Persistencia local
  useEffect(() => {
    try {
      const saved = localStorage.getItem("plan-edit");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.steps) && typeof parsed.title === "string") {
          setTitle(parsed.title);
          setSteps(parsed.steps);
        }
      }
    } catch (err) {
      console.warn("No se pudo recuperar el plan guardado:", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("plan-edit", JSON.stringify({ title, steps }));
    } catch {
      console.warn("No se pudo guardar en localStorage");
    }
  }, [title, steps]);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;
    const oldIndex = steps.findIndex((s) => s.id === active.id);
    const newIndex = steps.findIndex((s) => s.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      setSteps(arrayMove(steps, oldIndex, newIndex));
    }
  }

  function handleStepChange(idx: number, field: keyof Step, value: string | number) {
    setSteps((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s))
    );
  }

  async function handleExportPDF() {
    setExporting(true);
    try {
      const blob = await pdf(<PlanPDFDocument plan={{ title, steps }} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "plan.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error al generar el PDF");
      console.error(err);
    } finally {
      setExporting(false);
    }
  }

  return (
    <section
      id="plan-canvas"
      className="w-full max-w-2xl mx-auto mt-8 p-8 rounded-2xl bg-card shadow-vintage border-2 border-accent2"
    >
      <div className="flex justify-between items-center mb-6 gap-2">
        <input
          className="text-3xl font-extrabold w-full bg-transparent border-b-2 border-dashed border-accent2 focus:border-accent3 outline-none text-accent2 tracking-widest mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {steps.length > 0 && (
          <button
            onClick={handleExportPDF}
            className="ml-2 px-6 py-3 rounded-xl bg-accent3 text-background font-extrabold text-lg shadow hover:bg-accent2 hover:text-accent3 transition border-2 border-accent3 hover:border-accent2 focus:outline-none focus:ring-2 focus:ring-accent2 focus:ring-offset-2 disabled:opacity-60"
            disabled={exporting}
          >
            {exporting ? "Exportando..." : "Exportar PDF"}
          </button>
        )}
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <ol className="space-y-6">
            {steps.map((step, idx) => (
              <StepItem
                key={step.id}
                step={step}
                id={step.id}
                onChange={(field, value) => handleStepChange(idx, field, value)}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
    </section>
  );
}
