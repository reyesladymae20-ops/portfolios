import { ProjectCard } from '@/components/molecules';
import { Badge } from '@/components/atoms';
import { getAllProjects, getFeaturedProjects } from '@/utils/projects';
import { getAllLogs } from '@/utils/content';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to my portfolio. Explore my internship projects and learning journey.',
};

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const allLogs = getAllLogs().slice(0, 3);

  return (
    <>
      {/* Profile Section - Now at Top */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <Image
                src="/images/profile.png"
                alt="Profile Picture"
                fill
                className="rounded-full object-cover shadow-lg"
                priority
                sizes="(max-width: 768px) 192px, 224px"
              />
            </div>
          </div>

          {/* About Content */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hi, I'm Here!
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              A passionate designer and developer dedicated to creating beautiful, 
              functional digital experiences. With a focus on user-centered design and 
              technical excellence, I transform ideas into impactful solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/work"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                View My Work
              </Link>
              <a
                href="mailto:your-email@example.com"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-2 text-gray-900">
            Featured Projects
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            A selection of my internship projects demonstrating technical proficiency
            and problem-solving skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/work"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Logs Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-2 text-gray-900">
            Latest Learning Logs
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            Weekly reflections on my technical learning and project updates.
          </p>

          <div className="space-y-6">
            {allLogs.map((log) => (
              <Link key={log.slug} href={`/logs/${log.slug}`}>
                <div className="p-6 border-l-4 border-blue-600 bg-white hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {log.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(log.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{log.excerpt}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="default">
                      {log.readingTime} min read
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/logs"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Read All Logs
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">
                {getAllProjects().length}
              </div>
              <p className="text-blue-100">Projects Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {getAllProjects().flatMap(p => p.techStack).length}+
              </div>
              <p className="text-blue-100">Technologies Used</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {getAllLogs().length}
              </div>
              <p className="text-blue-100">Learning Logs</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
