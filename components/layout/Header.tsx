'use client';

import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { user, isLoggedIn } = useAuthUser();
  const { signOut } = useAuth();

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b px-6 backdrop-blur-2xl">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="rounded-lg p-2 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <h1 className="text-brand-yellow text-2xl font-bold md:text-3xl">
          CruiseVote
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {isLoggedIn ? (
          <>
            {mounted ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="outline-none">
                    <div className="bg-brand-yellow flex h-10 w-10 items-center justify-center rounded-full text-lg font-medium text-black">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 border border-gray-800 bg-black text-gray-200"
                >
                  <DropdownMenuLabel className="space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {user.user_metadata.display_name || 'User'}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-900">
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-900">
                    <Link href="/home/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-red-500/10">
                    <button onClick={signOut}>Log out</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-800" />
            )}
          </>
        ) : (
          <div className="flex gap-4"></div>
        )}
      </div>
    </nav>
  );
}
