"use client";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Plan, Step } from "@/types/plan";
import type { DragEndEvent } from "@dnd-kit/core";

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
      className={`p-4 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-black flex flex-col gap-2 relative transition-shadow ${isDragging ? "shadow-2xl z-10" : ""}`}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <input
          className="font-semibold text-lg mb-1 bg-transparent border-b border-dashed border-gray-300 focus:border-blue-400 outline-none flex-1 min-w-0"
          value={step.title}
          onChange={e => onChange("title", e.target.value)}
        />
        <div className="flex gap-4 items-center text-sm">
          <label>
            ⏱️
            <input
              type="number"
              min={1}
              max={40}
              className="w-12 ml-1 bg-transparent border-b border-dashed border-gray-300 focus:border-blue-400 outline-none text-right"
              value={step.estimatedHours}
              onChange={e => onChange("estimatedHours", Number(e.target.value))}
            />h
          </label>
          <label>
            📅
            <input
              type="date"
              className="ml-1 bg-transparent border-b border-dashed border-gray-300 focus:border-blue-400 outline-none"
              value={step.deadline}
              onChange={e => onChange("deadline", e.target.value)}
            />
          </label>
        </div>
      </div>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        {step.description}
      </p>
      {step.resources.length > 0 && (
        <ul className="list-disc list-inside text-blue-600 dark:text-blue-400">
          {step.resources.map((r, i) => (
            <li key={i}>
              <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
            </li>
          ))}
        </ul>
      )}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 cursor-grab text-xl select-none opacity-60 pl-2">☰</span>
    </li>
  );
}

export default function PlanViewer({ plan }: Props) {
  const [steps, setSteps] = useState<Step[]>(plan.steps);
  const [title, setTitle] = useState(plan.title);

  // Persistencia en localStorage
  useEffect(() => {
    const saved = localStorage.getItem("plan-edit");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTitle(parsed.title);
        setSteps(parsed.steps);
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("plan-edit", JSON.stringify({ title, steps }));
  }, [title, steps]);

  // DnD Kit setup
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = steps.findIndex(s => s.id === active.id);
      const newIndex = steps.findIndex(s => s.id === over.id);
      setSteps(arrayMove(steps, oldIndex, newIndex));
    }
  }

  function handleStepChange(idx: number, field: keyof Step, value: string | number) {
    setSteps(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  }

  return (
    <section id="plan-canvas" className="w-full max-w-2xl mx-auto mt-8 p-6 rounded-lg bg-gray-50 dark:bg-gray-900 shadow">
      <input
        className="text-2xl font-bold mb-4 w-full bg-transparent border-b border-dashed border-gray-300 focus:border-blue-400 outline-none"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
          <ol className="space-y-4">
            {steps.map((step, idx) => (
              <StepItem
                key={step.id}
                step={step}
                onChange={(field, value) => handleStepChange(idx, field, value)}
                id={step.id}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
    </section>
  );
} 