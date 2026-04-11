'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Vote,
  PlusCircle,
  HomeIcon,
  UserCogIcon,
  Settings,
  LogOut,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import * as React from 'react';

interface SideBarItemTypes {
  id: number;
  name: string;
  path: string;
  icon: React.ReactNode;
  isAdmin: boolean;
}
interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const pathName = usePathname();
  const { isAdmin } = useApp();
  const { signOut } = useAuth();

  const topNavItems: SideBarItemTypes[] = [
    {
      id: 1,
      name: 'Home',
      path: '/home',
      icon: <HomeIcon size={20} />,
      isAdmin: false,
    },
    {
      id: 4,
      name: 'Vote',
      path: '/home/vote',
      icon: <Vote size={20} />,
      isAdmin: false,
    },
    {
      id: 3,
      name: 'Create Poll',
      path: '/home/create-poll',
      icon: <PlusCircle size={20} />,
      isAdmin: true,
    },
    {
      id: 2,
      name: 'Manage',
      path: '/home/manage',
      icon: <UserCogIcon size={20} />,
      isAdmin: true,
    },
  ];

  const bottomNavItems: SideBarItemTypes[] = [
    {
      id: 5,
      name: 'Settings',
      path: '/home/settings',
      icon: <Settings size={20} />,
      isAdmin: false,
    },
  ];

  const checkActive = (itemPath: string) => {
    if (itemPath === '/home') return pathName === '/home';
    return pathName.startsWith(itemPath);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: "You will be logged out and need to log in again to access your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, log me out out!',
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
        closeSidebar();

        Swal.fire({
        title: 'Logged Out',
        text: 'You have been logged out successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      }
    });
  }

  return (
    <>
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="text-md flex h-full flex-col justify-between p-4 font-medium">
          {/* Top Section */}
          <nav className="space-y-1">
            {topNavItems
              .filter((item) => !item.isAdmin || isAdmin)
              .map((item) => (
                <Link href={item.path} key={item.id} onClick={closeSidebar}>
                  <div
                    className={`flex items-center gap-4 px-4 py-3 transition-all ${
                      checkActive(item.path)
                        ? 'bg-brand-yellow rounded-xl text-black'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}
          </nav>

          {/* Bottom Section */}
          <div className="mb-5 space-y-1">
            {bottomNavItems
              .filter((item) => !item.isAdmin || isAdmin)
              .map((item) => (
                <Link href={item.path} key={item.id} onClick={closeSidebar}>
                  <div
                    className={`flex items-center gap-4 px-4 py-3 transition-all ${
                      checkActive(item.path)
                        ? 'bg-brand-yellow rounded-xl text-black'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}

            {isAdmin && (
              <button
                className="flex w-full items-center gap-4 px-4 py-3 text-red-500 transition-all hover:bg-white/10"
                onClick={() => handleLogout()}
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}
