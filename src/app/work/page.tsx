'use client';

import { useState, useMemo } from 'react';
import { getAllProjects, getCategories, getTechStack, filterProjects } from '@/utils/projects';
import { ProjectCard } from '@/components/molecules';
import type { Category } from '@/types';

export default function WorkPage() {
  const projects = getAllProjects();
  const categories = getCategories();
  const techStack = getTechStack();

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return filterProjects(projects, {
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      techStack: selectedTech.length > 0 ? selectedTech : undefined,
      searchQuery: searchQuery || undefined,
    });
  }, [selectedCategories, selectedTech, searchQuery]);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTech([]);
    setSearchQuery('');
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">My Work</h1>
        <p className="text-gray-600 mb-12">
          Explore my projects filtered by category or technology stack.
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Categories Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTech.includes(tech)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedCategories.length > 0 ||
            selectedTech.length > 0 ||
            searchQuery) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">
              No projects match your filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
