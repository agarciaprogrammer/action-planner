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
  resources: Resource[];
}

export interface Resource {
  type: 'link';
  title: string;
  url: string;
}