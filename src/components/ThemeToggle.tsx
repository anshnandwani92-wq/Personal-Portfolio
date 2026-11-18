import { useEffect, useState } from 'react';
import { haptic } from '../lib/haptics';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme !== 'light');
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextDark ? '#111923' : '#f1eee6');
    try {
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    } catch {
      // The visual theme still changes when storage is unavailable.
    }
    haptic();
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} title="Toggle theme">
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {dark ? <><circle cx="12" cy="12" r="3.5" /><path d="M12 2.5v2M12 19.5v2M4.58 4.58 6 6M18 18l1.42 1.42M2.5 12h2M19.5 12h2M4.58 19.42 6 18M18 6l1.42-1.42" /></> : <path d="M20.2 15.1A8.6 8.6 0 0 1 8.9 3.8 8.8 8.8 0 1 0 20.2 15.1Z" />}
      </svg>
    </button>
  );
}
