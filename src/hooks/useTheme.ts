import { useEffect, useState } from 'react';
import type { ThemeName } from '../types';

const STORAGE_KEY = 'side-by-day-theme';
const DEFAULT_THEME: ThemeName = 'cute';

function isThemeName(value: string | null): value is ThemeName {
  return value === 'natural' || value === 'cute' || value === 'simple' || value === 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isThemeName(saved) ? saved : DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme };
}
