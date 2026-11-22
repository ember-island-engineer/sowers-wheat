import { useCallback, useEffect, useState } from 'react';

import { readingSlug } from '../../../../reading-slugs';

// Keep saved reading progress when legacy filenames become clean URL slugs.
const STORAGE_KEY = 'progress';

const toKey = (href: string) => href.replace(/^\//, '');

const read = (): Record<string, boolean> => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') || {};
    return Object.fromEntries(
      Object.entries(stored).map(([key, value]) => [
        key
          .split('/')
          .map((part, index) => (index === 0 ? part : readingSlug(part)))
          .join('/'),
        value,
      ])
    ) as Record<string, boolean>;
  } catch {
    return {};
  }
};

export const useProgress = () => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setProgress(read());
  }, []);

  const setRead = useCallback((href: string, value: boolean) => {
    const updated = { ...read(), [toKey(href)]: value };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage unavailable (private mode); keep progress for this visit only
    }
    setProgress(updated);
  }, []);

  const isRead = useCallback(
    (href: string) => Boolean(progress[toKey(href)]),
    [progress]
  );

  return { isRead, setRead };
};
