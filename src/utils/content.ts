import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Log } from '@/types';

const logsDirectory = path.join(process.cwd(), 'src/content/logs');

export function getLogSlugs(): string[] {
  const files = fs.readdirSync(logsDirectory);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getLogBySlug(slug: string): Log | null {
  try {
    const fullPath = path.join(logsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const htmlContent = marked(content);
    const readingTime = Math.ceil(content.split(/\s+/).length / 200);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content: htmlContent as string,
      readingTime,
    };
  } catch {
    return null;
  }
}

export function getAllLogs(): Log[] {
  const slugs = getLogSlugs();
  const logs = slugs
    .map((slug) => getLogBySlug(slug))
    .filter((log): log is Log => log !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return logs;
}
