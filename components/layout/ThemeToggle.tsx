'use client';

import { useApp } from '@/context/AppContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center gap-3 rounded-full px-3 py-1.5 transition-all duration-500 ${
        theme === 'dark'
          ? 'border border-white/10 bg-white/5 hover:border-[--color-brand-yellow]/50'
          : 'border border-gray-200 bg-gray-100 hover:border-blue-500'
      } `}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Moving Slider Background */}
      <div
        className={`absolute top-1 bottom-1 w-8 rounded-full shadow-sm transition-all duration-500 ${
          theme === 'dark'
            ? 'left-1 bg-[--color-brand-yellow]'
            : 'left-[calc(100%-2.25rem)] bg-blue-600'
        } `}
      />

      {/* Icons */}
      <div className="relative z-10 flex w-full items-center justify-between gap-4">
        <Sun
          size={14}
          className={`transition-colors duration-500 ${theme === 'dark' ? 'text-black' : 'text-gray-400'}`}
        />
        <Moon
          size={14}
          className={`transition-colors duration-500 ${theme === 'light' ? 'text-white' : 'text-gray-500'}`}
        />
      </div>
    </button>
  );
}
