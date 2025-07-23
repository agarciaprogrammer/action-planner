import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { Plan } from '@/types/plan';

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
      "id": "<uuid>",
      "title": "...",
      "description": "...",
      "estimatedHours": <int>,
      "deadline": "YYYY-MM-DD",
      "resources": [{"type":"link","title":"","url":""}]
    }
  ]
}
- Total estimatedHours <= 40.
- Each step must be doable in 1-3 days.
- Start today (${today}).
- Provide 0-2 high-quality links per step.
- Double check your output is valid JSON and matches the schema.
- Do NOT include trailing commas or any explanation.
`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ],
    model: 'deepseek-r1-distill-llama-70b',
    temperature: 0.2,
    max_tokens: 1200,
    response_format: { type: 'json_object' },
  });

  const raw = JSON.parse(chatCompletion.choices[0]?.message?.content || '{}');
  // Asegura que cada paso tenga un id
  raw.steps?.forEach((s: any) => (s.id = s.id || nanoid()));
  return NextResponse.json(raw as Plan);
} 