import { NextRequest, NextResponse } from 'next/server';
import { Plan } from '@/types/plan';

export const runtime = 'edge';

const mockPlan: Plan = {
  title: 'Aprender TypeScript en 1 semana',
  steps: [
    {
      id: '1',
      title: 'Instalar herramientas',
      description: 'Configura tu entorno de desarrollo con Node.js y un editor.',
      estimatedHours: 2,
      deadline: '2024-06-10',
      resources: [
        { type: 'link', title: 'Node.js', url: 'https://nodejs.org/' },
        { type: 'link', title: 'VSCode', url: 'https://code.visualstudio.com/' },
      ],
    },
    {
      id: '2',
      title: 'Leer documentación oficial',
      description: 'Lee la guía oficial de TypeScript para entender los conceptos básicos.',
      estimatedHours: 6,
      deadline: '2024-06-12',
      resources: [
        { type: 'link', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' },
      ],
    },
    {
      id: '3',
      title: 'Practicar con ejercicios',
      description: 'Resuelve ejercicios prácticos para afianzar tus conocimientos.',
      estimatedHours: 8,
      deadline: '2024-06-14',
      resources: [
        { type: 'link', title: 'Exercism', url: 'https://exercism.org/tracks/typescript' },
      ],
    },
  ],
};

export async function POST(req: NextRequest) {
  return NextResponse.json(mockPlan);
} 