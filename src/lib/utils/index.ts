export const calculateReadTime = (text: string) => {
  const words = text.split(' ').length;
  const wordsPerMinute = 180;
  return Math.max(1, Math.floor(words / wordsPerMinute));
};

const decodeEntities = (text: string) =>
  text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

/** Plain-text opening of the first paragraph, for card excerpts. */
export const getCrux = (article: string) => {
  const match = article.match(/<p>([\s\S]*?)<\/p>/);
  if (!match) return '';
  return decodeEntities(match[1].replace(/<[^>]+>/g, ''))
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);
};

export const parseTitle = (string) => {
  return string.split(')');
};

/** Request a smaller rendition of an Unsplash/Pexels image. */
export const sizedImage = (url: string | undefined, width: number) => {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    if (!/unsplash\.com|pexels\.com/.test(parsed.hostname)) return url;
    parsed.searchParams.set('w', String(width));
    parsed.searchParams.delete('h');
    return parsed.toString();
  } catch {
    return url;
  }
};

/** "1)-Marriage" -> "marriage", used as the series anchor on /devotions */
export const seriesAnchor = (type: string) =>
  type
    .replace(/^\d+\)-/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
