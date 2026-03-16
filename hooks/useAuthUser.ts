'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, subscribeUser } from '@/utils/supabaseAuthListerner';

export function useAuthUser() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const unsubscribe = subscribeUser((u) => setUser(u));
    return unsubscribe;
  }, []);

  const isLoggedIn = !!user;

  return { user, isLoggedIn };
}
