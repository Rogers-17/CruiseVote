'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Vote, PlusCircle, HomeIcon } from 'lucide-react';
import * as React from 'react';

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

  const PrimarySideBarItems: SideBarItemTypes[] = [
    { id: 1, name: 'Home', path: '/home', icon: <HomeIcon /> },
    { id: 2, name: 'Polls', path: '/home/polls', icon: <Vote /> },
    { id: 4, name: 'Vote', path: '/home/vote', icon: <Vote /> },
    {
      id: 3,
      name: 'Create Poll',
      path: '/home/create-poll',
      icon: <PlusCircle />,
    },
  ];

  return (
    <>
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r transition-transform duration-300 ease-in-out  ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="text-md p-4 font-medium">
          {PrimarySideBarItems.map((item) => {
            const isActive = pathName === item.path;

            return (
              <Link href={item.path} key={item.id} onClick={closeSidebar}>
                <div
                  className={`flex items-center gap-4 px-4 py-3 transition-all ${
                    isActive
                      ? 'bg-brand-yellow rounded-xl text-black'
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
        <div onClick={closeSidebar} className="fixed inset-0 z-30 md:hidden backdrop-blur-sm" />
      )}
    </>
  );
}
