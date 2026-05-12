import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Details',
  description: 'Detailed view of my portfolio projects with technical documentation and live links.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
