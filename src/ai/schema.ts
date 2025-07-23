import { z } from 'zod';

export const ResourceSchema = z.object({
  type: z.literal('link'),
  title: z.string(),
  url: z.string().url()
});

export const StepSchema = z.object({
  title: z.string(),
  description: z.string(),
  estimatedHours: z.number().int().min(1).max(40),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  resources: z.array(ResourceSchema).max(2)
});

export const PlanSchema = z.object({
  title: z.string(),
  steps: z.array(StepSchema).min(1).max(7)
});

export type ValidatedPlan = z.infer<typeof PlanSchema>;