import { Plan } from '@/types/plan';

interface Props {
  plan: Plan;
}

export default function PlanViewer({ plan }: Props) {
  return (
    <section id="plan-canvas" className="w-full max-w-2xl mx-auto mt-8 p-6 rounded-lg bg-gray-50 dark:bg-gray-900 shadow">
      <h2 className="text-2xl font-bold mb-4">{plan.title}</h2>
      <ol className="space-y-4">
        {plan.steps.map((step) => (
          <li key={step.id} className="p-4 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
            <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
            <p className="mb-2 text-gray-700 dark:text-gray-300">{step.description}</p>
            <div className="flex flex-wrap gap-4 text-sm mb-2">
              <span>⏱️ {step.estimatedHours}h</span>
              <span>📅 {step.deadline}</span>
            </div>
            {step.resources.length > 0 && (
              <ul className="list-disc list-inside text-blue-600 dark:text-blue-400">
                {step.resources.map((r, i) => (
                  <li key={i}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
} 