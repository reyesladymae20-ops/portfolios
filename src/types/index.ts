export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  techStack: string[];
  category: 'Frontend' | 'Backend' | 'Research' | 'SEO Audit' | 'Full Stack' | 'Design' | 'UI/UX Design';
  completionDate: string;
  link?: string;
  github?: string;
  image?: string;
  featured: boolean;
  status?: 'Completed' | 'In-Progress';
}

export interface Log {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'project' | 'learning';
}

export type Category = Project['category'];
