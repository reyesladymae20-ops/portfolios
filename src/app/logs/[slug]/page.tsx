import { getLogBySlug, getLogSlugs, getAllLogs } from '@/utils/content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getLogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const log = getLogBySlug(slug);

  if (!log) {
    return {};
  }

  return {
    title: log.title,
    description: log.excerpt,
    openGraph: {
      type: 'article',
      title: log.title,
      description: log.excerpt,
      publishedTime: log.date,
    },
  };
}

export default async function LogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const log = getLogBySlug(slug);

  if (!log) {
    notFound();
  }

  const allLogs = getAllLogs();
  const currentIndex = allLogs.findIndex((l) => l.slug === slug);
  const previousLog = currentIndex < allLogs.length - 1 ? allLogs[currentIndex + 1] : null;
  const nextLog = currentIndex > 0 ? allLogs[currentIndex - 1] : null;

  return (
    <article className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <Link href="/logs" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Logs
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{log.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <time dateTime={log.date}>
              {new Date(log.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{log.readingTime} min read</span>
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-slate max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: log.content }}
        />

        {/* Navigation */}
        <nav className="border-t pt-8 grid grid-cols-2 gap-4">
          {previousLog && (
            <Link href={`/logs/${previousLog.slug}`} className="text-left">
              <div className="text-sm text-gray-600 mb-1">← Previous</div>
              <div className="text-blue-600 hover:text-blue-700 font-semibold">
                {previousLog.title}
              </div>
            </Link>
          )}
          {nextLog && (
            <Link href={`/logs/${nextLog.slug}`} className="text-right">
              <div className="text-sm text-gray-600 mb-1">Next →</div>
              <div className="text-blue-600 hover:text-blue-700 font-semibold">
                {nextLog.title}
              </div>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
