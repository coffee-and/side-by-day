import { useEffect, useState } from 'react';
import type { ThemeName } from '../types';

const STORAGE_KEY = 'side-by-day-theme';
const DEFAULT_THEME: ThemeName = 'natural';
const themeColors: Record<ThemeName, string> = {
  natural: '#FBF9F6',
  simple: '#F6F3EF',
  cute: '#FFF8F2',
  dark: '#121212',
};

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
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme]);
  }, [theme]);

  return { theme, setTheme };
}
