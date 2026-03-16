'use client';

import { createClient } from './supabase/client';

let currentUser: any = null;
let listeners: ((user: any) => void)[] = [];
const supabase = createClient();
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
