'use client';

import { ContestantPayload, GetContestant } from '@/lib/type';
import * as db from '@/utils/supabase/db';
import { supabase } from '@/utils/supabase/client'; // Ensure this is imported
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';

export const QK = {
  health: ['health'] as const,
  votes: ['votes'] as const,
  activePoll: ['activePoll'] as const,
  contestants: ['contestants'] as const,
};

interface AppContextVal {
  activePoll: any;
  allPolls: any;
  contestants: any[];
  retry: () => void;
  loading: boolean;
  addContestant: (
    data: ContestantPayload & { poll_id: string },
  ) => Promise<void>;
  generateCodes: (prefix: string, count: number) => Promise<void>;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  user: any | null;
  isAdmin: boolean;
  authLoading: boolean;
}

const AppContext = React.createContext<AppContextVal | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const qc = useQueryClient();

  // 1. Theme State
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');

  // 2. Auth State
  const [user, setUser] = React.useState<any | null>(null);
  const [authLoading, setAuthLoading] = React.useState(true);

  // --- Auth & Theme Logic ---
  React.useEffect(() => {
    // Sync theme with HTML class for Tailwind 'dark:' selector
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  React.useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const isAdmin = !!user; // For now, any logged in user is admin. You can refine this later.

  // ------------- Real-Time Listener ----------------
  React.useEffect(() => {
    const channel = supabase
      .channel('voting-updates')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen for inserts (votes) and updates (contestant counts)
          schema: 'public',
          table: 'contestants',
        },
        () => {
          // When a contestant's vote_count changes, refetch the list
          qc.invalidateQueries({ queryKey: QK.contestants });
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'votes',
        },
        () => {
          // When a new vote record is added, refresh the votes list
          qc.invalidateQueries({ queryKey: QK.votes });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  // ------------- Queries ---------------
  const healthQ = useQuery({
    queryKey: QK.health,
    queryFn: () => db.healthCheck(),
    retry: 1,
    staleTime: 30_000,
  });

  const activePollQ = useQuery({
    queryKey: QK.activePoll,
    queryFn: async () => {
      const result = await db.getActivePoll();
      return result.data ?? null;
    },
    enabled: !!healthQ.data,
  });

  const votesQ = useQuery({
    queryKey: QK.votes,
    queryFn: async () => {
      const data = await db.getVotes();
      return data ?? [];
    },
    enabled: !!healthQ.data,
  });

  const activePollId = activePollQ.data?.id; // Fixed access path based on your context return

  const allPollsQ = useQuery({
    queryKey: ['allPolls'],
    queryFn: db.getAllPolls,
    enabled: healthQ.isSuccess,
  });

  const contestantsQ = useQuery({
    queryKey: QK.contestants,
    queryFn: () => db.getContestants(),
    enabled: healthQ.isSuccess,
  });

  // ----------- Invalidation Helpers -----------
  const invalidateAll = React.useCallback(() => {
    qc.invalidateQueries({ queryKey: QK.health });
    qc.invalidateQueries({ queryKey: QK.votes });
    qc.invalidateQueries({ queryKey: QK.activePoll });
    qc.invalidateQueries({ queryKey: QK.contestants });
  }, [qc]);

  const retry = React.useCallback(() => {
    qc.invalidateQueries({ queryKey: QK.health });
    invalidateAll();
  }, [qc, invalidateAll]);

  // ---------- Mutations --------------
  const createContestantMut = useMutation({
    mutationFn: db.createContestant,
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.contestants }),
  });

  const generateCodesMut = useMutation({
    mutationFn: ({ prefix, count }: { prefix: string; count: number }) =>
      db.generateFormattedCodes(activePollId, prefix, count),
    onSuccess: () => invalidateAll(),
  });

  // -------- Derived States ------------
  const votes = votesQ.data ?? [];
  const contestants = contestantsQ.data ?? [];
  const loading =
    healthQ.isPending ||
    activePollQ.isPending ||
    votesQ.isPending ||
    contestantsQ.isPending;

  // ── Async wrappers ──────
  const addContestant = (data: ContestantPayload & { poll_id: string }) =>
    createContestantMut.mutateAsync(data).then(() => {});

  const generateCodes = (prefix: string, count: number) =>
    generateCodesMut.mutateAsync({ prefix, count });

  const handleGenerate = () => {};

  return (
    <AppContext.Provider
      value={{
        activePoll: activePollQ.data,
        contestants,
        retry,
        addContestant,
        generateCodes,
        loading,
        allPolls: allPollsQ.data ?? [],
        theme,
        toggleTheme,
        user,
        isAdmin,
        authLoading,
      }}
    >
      <div
        className={`${theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'} min-h-screen transition-colors duration-300`}
      >
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp(): AppContextVal {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
