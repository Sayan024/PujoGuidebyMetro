import { useEffect } from 'react';
import { useAppStore } from '@/store/appStore';

/** Keeps <html data-theme> and the browser chrome colour in sync with the saved preference. */
export function useThemeSync() {
  const theme = useAppStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#120909' : '#fff6e5');
  }, [theme]);
}

export function useTheme() {
  const theme = useAppStore((s) => s.theme);
  const toggle = useAppStore((s) => s.toggleTheme);
  return { theme, toggle, isDark: theme === 'dark' };
}
