'use client';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, authLoading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/login'); // Redirect unauthorized people
    }
  }, [isAdmin, authLoading, router]);

  if (authLoading)
    return (
      <div className="text-brand-yellow p-20 text-center font-black italic">
        VERIFYING ADMIN...
      </div>
    );

  return isAdmin ? <>{children}</> : null;
}
