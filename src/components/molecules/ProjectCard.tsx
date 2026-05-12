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
      <Link href={`/projects/${project.id}`}>
        <div
          ref={ref}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col"
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

          <div className="p-6 flex flex-col flex-grow">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{project.shortDescription}</p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
              {project.techStack.length > 3 && (
                <Badge variant="default">+{project.techStack.length - 3}</Badge>
              )}
            </div>

            <div className="flex-grow" />

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{formatDate(project.completionDate)}</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                {project.category}
              </span>
            </div>

            <span className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';
