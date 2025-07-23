import { groq } from './groqClient';
import { getSystemPrompt } from './prompt';
import { PlanSchema, ValidatedPlan } from './schema';
import { nanoid } from 'nanoid';

export async function generatePlan(userPrompt: string): Promise<ValidatedPlan> {
  const today = new Date().toISOString().slice(0, 10);
  const systemPrompt = getSystemPrompt(today);

  const chat = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    model: 'deepseek-r1-distill-llama-70b',
    temperature: 0.2,
    max_tokens: 1200,
    response_format: { type: 'json_object' },
  });

  const raw = chat.choices[0]?.message?.content || '{}';

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error('Respuesta malformada del modelo:', err);
    throw new Error('Respuesta malformada del modelo');
  }

  const result = PlanSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error('El plan generado no cumple con el esquema');
  }

  // Agrega IDs únicos a cada paso
  const stepsWithIds = result.data.steps.map((step) => ({ ...step, id: nanoid() }));

  return {
    title: result.data.title,
    steps: stepsWithIds
  };
}

