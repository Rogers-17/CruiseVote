'use client'

import { ContestantPayload, GetContestant } from '@/lib/type';
import * as db from '@/utils/supabase/db'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react'

export const QK = {
    health: ["health"] as const,
    votes: ["votes"] as const,
    activePoll: ["activePoll"] as const,
    contestants: ["contestants"] as const, 
}

interface AppContextVal {
    activePoll: any;
    allPolls: any; 
    contestants: GetContestant[];
    retry: () => void;
    loading: boolean;
    addContestant: (data: ContestantPayload & { poll_id: string }) => Promise<void>;
    generateCodes: (prefix: string, count: number) => Promise<void>;
    
}

const AppContext = React.createContext<AppContextVal | null>(null);

export function AppProvider({ children }: { children: React.ReactNode}) {
    const qc = useQueryClient();

    // ------------- Queries ---------------
    const healthQ = useQuery({
        queryKey: QK.health,
        queryFn: () => db.healthCheck(), // Now returns "ok"
        retry: 1,
        staleTime: 30_000,
    })

    // Update activePollQ to ensure it returns data or null, never undefined
    const activePollQ = useQuery({
        queryKey: QK.activePoll,
        queryFn: async () => {
            const result = await db.getActivePoll();
            return result.data ?? null; // Ensure null if no active poll
        },
        enabled: !!healthQ.data, // Only run if health check passed
    })

    // Update votesQ similarly
    const votesQ = useQuery({
        queryKey: QK.votes,
        queryFn: async () => {
            const data = await db.getVotes();
            return data ?? []; // Ensure empty array if no votes
        },
        enabled: !!healthQ.data
    })

    const activePollId = activePollQ.data?.data?.id;

    const allPollsQ = useQuery({
        queryKey: ["allPolls"],
        queryFn: db.getAllPolls,
        enabled: healthQ.isSuccess
    });

    console.log("All Polls Data:", allPollsQ.data); // Debug log for all polls

// // Add this to your return value
// const allPolls = allPollsQ.data ?? [];

    const contestantsQ = useQuery({
        queryKey: QK.contestants,
        queryFn: () => db.getContestants(),
        enabled: healthQ.isSuccess
    })

    // ----------- Invalidation Helper (Preserved) -----------
    const invalidateAll = React.useCallback(() => {
        qc.invalidateQueries({ queryKey: QK.health})
        qc.invalidateQueries({ queryKey: QK.votes})
        qc.invalidateQueries({ queryKey: QK.activePoll})
    },[qc]);

    const retry = React.useCallback(() => {
        qc.invalidateQueries({ queryKey: QK.health });
        invalidateAll();
    }, [qc, invalidateAll]);

    // ---------- Mutations (Preserved & Added) --------------

    const createContestantMut = useMutation({
        mutationFn: db.createContestant,
        onSuccess: () => qc.invalidateQueries({ queryKey: QK.contestants }),
    });

    const generateCodesMut = useMutation({
        mutationFn: ({ prefix, count }: { prefix: string, count: number }) => 
            db.generateFormattedCodes(activePollId, prefix, count),
        onSuccess: () => invalidateAll(),
    });

    // -------- Derived States (Preserved) ------------
    const votes = votesQ.data ?? [];
    const contestants = contestantsQ.data ?? [];

    const loading = healthQ.isPending || activePollQ.isPending || votesQ.isPending;

    const firstError = healthQ.error ?? activePollQ.error ?? votesQ.error ?? null;

    const error = firstError ? (firstError as Error).message ?? "Unknown error" : null;

    // ── Async wrappers ──────
    const addContestant = (data: ContestantPayload & { poll_id: string }) => 
        createContestantMut.mutateAsync(data).then(() => {});

    const generateCodes = (prefix: string, count: number) => 
        generateCodesMut.mutateAsync({ prefix, count });

    return (
        <AppContext.Provider
            value={{
                activePoll: activePollQ.data?.data,
                contestants,
                retry,
                addContestant,
                generateCodes,
                loading,
                allPolls: allPollsQ.data ?? [], // Added to context value
            }}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp(): AppContextVal {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}