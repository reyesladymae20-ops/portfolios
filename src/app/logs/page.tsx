import { getAllLogs } from '@/utils/content';
import Link from 'next/link';
import { Badge } from '@/components/atoms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Logs',
  description: 'Weekly learning logs and technical documentation from my internship journey.',
};

export default function LogsPage() {
  const logs = getAllLogs();

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Learning Logs</h1>
        <p className="text-gray-600 mb-12">
          Weekly reflections on my technical learning, project challenges, and professional growth.
        </p>

        {logs.length > 0 ? (
          <div className="space-y-6">
            {logs.map((log) => (
              <Link key={log.slug} href={`/logs/${log.slug}`}>
                <article className="p-6 border-l-4 border-blue-600 bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">
                      {log.title}
                    </h2>
                    <time className="text-sm text-gray-500">
                      {new Date(log.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <p className="text-gray-600 mb-4">{log.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="default">{log.readingTime} min read</Badge>
                    <span className="text-blue-600 font-semibold hover:text-blue-700">
                      Read More →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No learning logs available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
