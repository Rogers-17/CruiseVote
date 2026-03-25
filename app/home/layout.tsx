'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useApp } from '@/context/AppContext'; // Import your hook

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useApp(); // Access the current theme

  return (
    // Remove "bg-black text-white" so it uses the CSS variables
    <div className="min-h-screen">
      <Header onToggleSidebar={() => setIsSidebarOpen((open) => !open)} />

      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <main className="min-h-screen pt-16 md:pl-64">
        <div className="p-4 md:p-6">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
