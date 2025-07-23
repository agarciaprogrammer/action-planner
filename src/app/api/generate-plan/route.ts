import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { Plan } from '@/types/plan';
import type { Step } from '@/types/plan';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const today = new Date().toISOString().slice(0, 10);

  const systemPrompt = `
You are an expert productivity coach.
Create a concise, actionable plan (max 7 steps) for the user's goal.

Requirements:
- Output ONLY valid JSON, no markdown, no comments, no extra text.
- The JSON must match this exact shape:
{
  "title": "<goal>",
  "steps": [
    {
      "title": "...",
      "description": "...",
      "estimatedHours": <int>,
      "deadline": "YYYY-MM-DD",
      "resources": [{"type":"link","title":"","url":""}]
    }
  ]
}
- Do NOT include trailing commas or any explanation.
- Do NOT include an "id" field (the system will assign it).
- Total estimatedHours <= 40.
- Each step must be doable in 1-3 days.
- Start today (${today}).
- Provide 0-2 high-quality links per step.
`;

  let chatCompletion;
  try {
    chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      model: 'deepseek-r1-distill-llama-70b',
      temperature: 0.2,
      max_tokens: 1200,
      response_format: { type: 'json_object' },
    });
  } catch (error) {
    console.error('Error al obtener respuesta de Groq:', error);
    return NextResponse.json({ error: 'Error al generar el plan. Intenta más tarde.' }, { status: 500 });
  }

  let content = chatCompletion.choices[0]?.message?.content || '{}';
  let raw;

  try {
    raw = JSON.parse(content);
  } catch {
    // 🔧 Primer intento: remover comas antes de ] o }
    content = content.replace(/,\s*([}\]])/g, '$1').trim();

    // 🔧 Segundo intento: recortar hasta el último cierre de objeto válido
    const lastValidIndex = content.lastIndexOf(']}');
    if (lastValidIndex !== -1) {
      const fixed = content.slice(0, lastValidIndex + 2);
      try {
        raw = JSON.parse(fixed);
      } catch {
        console.error('Error al parsear JSON (recortado):', fixed);
        return NextResponse.json({ error: 'No se pudo parsear el plan generado. Intenta de nuevo.' }, { status: 500 });
      }
    } else {
      console.error('JSON malformado sin cierre válido:', content);
      return NextResponse.json({ error: 'No se pudo parsear el plan generado. Intenta de nuevo.' }, { status: 500 });
    }
  }

  // 🧠 Agrega ID a cada paso
  try {
    (raw.steps as Step[])?.forEach((s) => {
      s.id = nanoid();
    });
  } catch (err) {
    console.error('Error al generar IDs para los pasos:', err);
    return NextResponse.json({ error: 'El formato del plan es inválido.' }, { status: 500 });
  }

  return NextResponse.json(raw as Plan);
}
