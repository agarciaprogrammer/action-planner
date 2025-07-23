import { NextRequest, NextResponse } from 'next/server';
import { generatePlan } from '../../../ai/generatePlan';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ error: 'Prompt inválido' }, { status: 400 });
  }

  try {
    const plan = await generatePlan(prompt);
    return NextResponse.json(plan);
  } catch (err: unknown) {
    console.error('Error al generar plan:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error interno al generar plan' },
      { status: 500 }
    );
  }
}
