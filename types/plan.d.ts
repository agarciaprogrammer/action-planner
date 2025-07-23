export interface Plan {
  title: string;
  steps: Step[];
}

export interface Step {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  deadline: string;
  resources: { type: 'link'; title: string; url: string }[];
} 