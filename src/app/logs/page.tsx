import { getAllLogs } from '@/utils/content';
import Link from 'next/link';
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logs.map((log) => (
              <Link key={log.slug} href={`/logs/${log.slug}`}>
                <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col cursor-pointer">
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-3">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {log.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4">{log.excerpt}</p>
                    </div>

                    <div className="flex-grow" />

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <time>
                        {new Date(log.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {log.readingTime} min read
                      </span>
                    </div>

                    <span className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors">
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
