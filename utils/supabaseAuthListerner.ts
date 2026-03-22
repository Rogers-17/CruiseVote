'use client';

import { supabase } from './supabase/client';

let currentUser: any = null;
let listeners: ((user: any) => void)[] = [];
supabase.auth.onAuthStateChange((event, session) => {
  currentUser = session?.user ?? null;
  listeners.forEach((fn) => fn(currentUser));
});

export const getCurrentUser = () => currentUser;

export const subscribeUser = (fn: (user: any) => void) => {
  listeners.push(fn);
  fn(currentUser); // call immediately
  return () => {
    listeners = listeners.filter((f) => f !== fn);
  };
};
