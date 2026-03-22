'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import * as db from '@/utils/supabase/db';
import { Search, Vote, CheckCircle2, X } from 'lucide-react';
import VoteModal from '@/components/layout/VoteModal';

export default function PublicVotePage() {
  const { id } = useParams();
  const router = useRouter();
  const { contestants, allPolls, loading } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGirl, setSelectedGirl] = useState<any>(null);
  const [voted, setVoted] = useState(false);

  // 1. Find the current Poll
  const poll = allPolls.find((p: any) => p.id === id);

  // 2. Filter Contestants by Search
  const filteredGirls = contestants
    .filter((c) => c.poll_id === id)
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-black font-black text-[--color-brand-yellow] italic">
        LOADING BALLOT...
      </div>
    );

  if (voted) {
    return (
      <div className="animate-in fade-in zoom-in flex min-h-screen flex-col items-center justify-center bg-black p-6 text-center duration-500">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[--color-brand-yellow]/20 bg-[--color-brand-yellow]/10">
          <CheckCircle2 className="h-12 w-12 text-[--color-brand-yellow]" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
          Vote Received!
        </h1>
        <p className="mt-4 max-w-xs font-medium text-gray-400">
          Your support for{' '}
          <span className="text-[--color-brand-yellow]">
            {selectedGirl?.name}
          </span>{' '}
          has been recorded.
        </p>
        <button
          onClick={() => setVoted(false)}
          className="mt-10 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-xs font-black tracking-widest uppercase transition hover:bg-white/10"
        >
          Vote for someone else
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20 text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-black/80 p-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div>
            <h1 className="text-lg font-black tracking-tighter text-[--color-brand-yellow] uppercase italic">
              {poll?.title || 'Starz Vote'}
            </h1>
            <p className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">
              Select your favorite
            </p>
          </div>
          <Vote className="h-5 w-5 text-[--color-brand-yellow]" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 p-4">
        {/* Search Bar */}
        <div className="group relative">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-[--color-brand-yellow]" />
          <input
            type="text"
            placeholder="Search contestant name..."
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 pl-12 text-sm transition-all outline-none placeholder:text-gray-600 focus:border-[--color-brand-yellow]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Contestant Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredGirls.map((girl) => (
            <div
              key={girl.id}
              onClick={() => setSelectedGirl(girl)}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-3xl border border-white/5 shadow-2xl transition-all active:scale-95"
            >
              <img
                src={girl.photo_url}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={girl.name}
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

              <div className="absolute bottom-0 w-full p-4">
                <p className="text-xs leading-tight font-black tracking-tight text-white uppercase">
                  {girl.name}
                </p>
                <p className="mt-0.5 text-[10px] font-bold text-[--color-brand-yellow] uppercase italic">
                  {girl.department}
                </p>
              </div>

              {/* Selection Glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-[--color-brand-yellow] opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {filteredGirls.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase">
              No contestants found
            </p>
          </div>
        )}
      </main>

      {/* Reusable Modal Component */}
      {selectedGirl && (
        <VoteModal
          girl={selectedGirl}
          pollId={id as string}
          onClose={() => setSelectedGirl(null)}
          onSuccess={() => setVoted(true)}
        />
      )}
    </div>
  );
}
