import { useCallback, useEffect, useState } from 'react';

// Stored as { "devotions/<type>/<id>": true } — the format the site has always used.
const STORAGE_KEY = 'progress';

const toKey = (href: string) => href.replace(/^\//, '');

const read = (): Record<string, boolean> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') || {};
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
