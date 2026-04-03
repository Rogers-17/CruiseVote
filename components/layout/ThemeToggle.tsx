'use client';

import { useApp } from '@/context/AppContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center rounded-xl p-1 transition-all duration-500 ${
        isDark
          ? 'hover:border-brand-yellow/50 border border-white/10 bg-white/5'
          : 'border border-gray-200 bg-gray-100 hover:border-blue-500'
      }`}
    >
      {/* Moving Background Slider */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg shadow-sm transition-all duration-500 ease-in-out ${
          isDark
            ? 'bg-brand-yellow border-brand-yellow left-[calc(50%+2px)]'
            : 'left-1 bg-white'
        }`}
      />

      {/* Label: Light */}
      <div
        className={`relative z-10 flex w-24 items-center justify-center gap-2 px-3 py-1.5 transition-colors duration-500 ${!isDark ? 'font-black text-black' : 'text-gray-500'}`}
      >
        <Sun size={14} strokeWidth={3} />
        <span className="text-[10px] tracking-widest uppercase">Light</span>
      </div>

      {/* Label: Dark */}
      <div
        className={`relative z-10 flex w-24 items-center justify-center gap-2 px-3 py-1.5 transition-colors duration-500 ${isDark ? 'font-black text-black' : 'text-gray-400'}`}
      >
        <Moon size={14} strokeWidth={3} />
        <span className="text-[10px] tracking-widest uppercase">Dark</span>
      </div>
    </button>
  );
}
