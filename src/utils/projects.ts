import { Project, Category } from '@/types';
import projectsData from '@/data/projects.json';

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}

export function getCategories(): Category[] {
  const categories = new Set(getAllProjects().map((project) => project.category));
  return Array.from(categories).sort();
}

export function getTechStack(): string[] {
  const techStack = new Set(
    getAllProjects().flatMap((project) => project.techStack)
  );
  return Array.from(techStack).sort();
}

export interface FilterOptions {
  categories?: Category[];
  techStack?: string[];
  searchQuery?: string;
}

export function filterProjects(
  projects: Project[],
  options: FilterOptions
): Project[] {
  let filtered = projects;

  if (options.categories && options.categories.length > 0) {
    filtered = filtered.filter((project) =>
      options.categories!.includes(project.category)
    );
  }

  if (options.techStack && options.techStack.length > 0) {
    filtered = filtered.filter((project) =>
      options.techStack!.some((tech) => project.techStack.includes(tech))
    );
  }

  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query))
    );
  }

  return filtered;
}
