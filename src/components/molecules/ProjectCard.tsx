'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import { Badge } from '@/components/atoms';
import { formatDate } from '@/utils/helpers';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        {project.image && (
          <div className="relative w-full h-48 bg-gray-200">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
          </div>

          <p className="text-gray-600 text-sm mb-4">{project.shortDescription}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="default">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>{formatDate(project.completionDate)}</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {project.category}
            </span>
          </div>

          {project.link && (
            <Link
              href={project.link}
              className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View Project →
            </Link>
          )}
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';
