'use client';

import { useState, useCallback } from 'react';
import { supabase } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export function useAuth() {
  const [message, setMessage] = useState('');

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:3000/home',
          data: {
            display_name: displayName,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        return false;
      } else {
        setMessage('Check your email for confirmation link');
        return true;
      }
    },
    [],
  );

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return false;
    } else {
      setMessage('Signed in successfully');
      redirect('/home');
      return true;
    }
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Signed out');
    }
  }, []);

  const getSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    console.log(data.session);
    return data.session;
  }, []);

  return {
    message,
    signUp,
    signIn,
    signOut,
    getSession,
  };
}
