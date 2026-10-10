/**
 * Build-time helpers for reading the HTML content in src/lib/data.
 * Only call these from getStaticProps / getStaticPaths.
 */
import fs from 'fs/promises';
import path from 'path';

import { calculateReadTime, getCrux } from '~/lib/utils';

const DATA_DIR = 'src/lib/data';

export type ContentSummary = {
  title: string;
  slug: string;
  readTime: number;
  excerpt: string;
};

export type NavLink = { title: string; href: string } | null;

export type DevotionSeries = {
  type: string;
  title: string;
  image: string;
  devotions: { id: string; title: string; href: string; readTime: number }[];
};

const NEW_TESTAMENT_ORDER = [
  'Matthew',
  'Mark',
  'Luke',
  'John',
  'Acts',
  'Romans',
  '1-Corinthians',
  '2-Corinthians',
  'Galatians',
  'Ephesians',
  'Philippians',
  'Colossians',
  'Thessalonians',
  '1,2-Timothy',
  'Titus',
  'Philemon',
  'Hebrews',
  'James',
  '1-&-2-Peter',
  '1,2-&-3-John',
  'Jude',
  'Revelations',
];

/** "1)-The-Purpose-of-Marriage.html" -> [1, "The Purpose of Marriage"] */
const parseNumbered = (name: string): [number, string] => {
  const [num, ...rest] = name.replace('.html', '').split(')');
  return [Number(num), rest.join(')').replaceAll('-', ' ').trim()];
};

const normalise = (text: string) =>
  text
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, 'and')
    .replace(/&/g, 'and')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

/**
 * Most documents open with an <h1> that repeats the page title.
 * Drop it when it does, so the title is not shown twice.
 */
export const stripLeadingTitle = (html: string, title: string) => {
  const match = html.match(/^\s*<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!match || /<\/?p[\s>]/.test(match[1])) return html;
  return normalise(match[1]).includes(normalise(title))
    ? html.slice(match[0].length)
    : html;
};

const readHtml = async (...segments: string[]) =>
  (await fs.readFile(path.join(DATA_DIR, ...segments))).toString();

const listFlat = async (dir: string): Promise<ContentSummary[]> => {
  const files = (await fs.readdir(path.join(DATA_DIR, dir))).filter((f) =>
    f.endsWith('.html')
  );
  return Promise.all(
    files.map(async (file) => {
      const content = await readHtml(dir, file);
      const slug = file.replace('.html', '');
      return {
        slug,
        title: slug.replaceAll('-', ' '),
        readTime: calculateReadTime(content),
        excerpt: getCrux(content),
      };
    })
  );
};

export const getArticles = () => listFlat('articles');

export const getExpositions = async () => {
  const expositions = await listFlat('expositions');
  const rank = (slug: string) => {
    const index = NEW_TESTAMENT_ORDER.indexOf(slug);
    return index === -1 ? NEW_TESTAMENT_ORDER.length : index;
  };
  return expositions.sort((a, b) => rank(a.slug) - rank(b.slug));
};

export const getFlatEntry = async (
  dir: 'articles' | 'expositions',
  slug: string
) => {
  const title = slug.replaceAll('-', ' ');
  const content = await readHtml(dir, `${slug}.html`);
  return {
    title,
    readTime: calculateReadTime(content),
    content: stripLeadingTitle(content, title),
  };
};

export const getDevotionSeries = async (
  images: Record<string, { image: string }>
): Promise<DevotionSeries[]> => {
  const types = (
    await fs.readdir(path.join(DATA_DIR, 'devotions'), { withFileTypes: true })
  )
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const series = await Promise.all(
    types.map(async (type) => {
      const files = (await fs.readdir(path.join(DATA_DIR, 'devotions', type)))
        .filter((f) => f.endsWith('.html'))
        .sort((a, b) => parseNumbered(a)[0] - parseNumbered(b)[0]);
      const devotions = await Promise.all(
        files.map(async (id) => ({
          id,
          title: parseNumbered(id)[1],
          href: `/devotions/${type}/${id}`,
          readTime: calculateReadTime(await readHtml('devotions', type, id)),
        }))
      );
      return {
        type,
        title: parseNumbered(type)[1],
        image: images[type]?.image ?? '',
        devotions,
      };
    })
  );

  return series.sort(
    (a, b) => parseNumbered(a.type)[0] - parseNumbered(b.type)[0]
  );
};

export const getDevotion = async (type: string, id: string) => {
  const title = parseNumbered(id)[1];
  const content = await readHtml('devotions', type, id);
  const files = (await fs.readdir(path.join(DATA_DIR, 'devotions', type)))
    .filter((f) => f.endsWith('.html'))
    .sort((a, b) => parseNumbered(a)[0] - parseNumbered(b)[0]);
  const index = files.indexOf(id);
  const link = (file?: string): NavLink =>
    file
      ? { title: parseNumbered(file)[1], href: `/devotions/${type}/${file}` }
      : null;

  return {
    title,
    seriesTitle: parseNumbered(type)[1],
    position: index + 1,
    total: files.length,
    readTime: calculateReadTime(content),
    content: stripLeadingTitle(content, title),
    prev: link(files[index - 1]),
    next: link(files[index + 1]),
  };
};
