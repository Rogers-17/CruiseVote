'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiClock,
  HiHome,
  HiVideoCamera,
  HiTrendingUp,
  HiThumbUp,
} from 'react-icons/hi';
import { HiMiniClock } from 'react-icons/hi2';
import { FiSettings } from 'react-icons/fi';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface SideBarItemTypes {
  id: number;
  name: string;
  path: string;
  icon: React.ReactNode;
}
interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const pathName = usePathname();
  const { signOut } = useAuth();

  const logout = () => {
    alert('Signing out...');
    signOut();
    closeSidebar();
  };

  const PrimarySideBarItems: SideBarItemTypes[] = [
    { id: 1, name: 'Home', path: '/home', icon: <HiHome /> },
    { id: 2, name: 'Trending', path: '/home/trending', icon: <HiTrendingUp /> },
    { id: 3, name: 'Watch Later', path: '/home/watch-later', icon: <HiClock /> }
  ];

  return (
    <>
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-gray-800 bg-black text-gray-300 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-4 text-lg font-medium text-gray-300">
          {PrimarySideBarItems.map((item) => {
            const isActive = pathName === item.path;

            return (
              <Link href={item.path} key={item.id} onClick={closeSidebar}>
                <div
                  className={`flex items-center gap-4 px-4 py-3 transition-all ${
                    isActive
                      ? 'rounded-xl bg-brand-yellow text-black'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}
    </>
  );
}
