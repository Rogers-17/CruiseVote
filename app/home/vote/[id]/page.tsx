'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Search, CheckCircle2 } from 'lucide-react';
import VoteModal from '@/components/layout/VoteModal';

export default function PublicVotePage() {
  const { id } = useParams();
  const { contestants, allPolls, loading } = useApp();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedGirl, setSelectedGirl] = React.useState<any>(null);
  const [voted, setVoted] = React.useState(false);

  // 1. Find the current Poll
  const poll = allPolls.find((p: any) => p.id === id);

  // 2. Filter Contestants by Search
  const filteredGirls = contestants
    .filter((c) => c.poll_id === id)
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading)
    return (
      <div className="text-brand-yellow flex min-h-screen items-center justify-center bg-black font-black italic">
        LOADING BALLOT...
      </div>
    );

  if (voted) {
    return (
      <div className="animate-in fade-in zoom-in flex min-h-screen flex-col items-center justify-center bg-black p-6 text-center duration-500">
        <div className="border-brand-yellow/20 bg-brand-yellow/10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border">
          <CheckCircle2 className="text-brand-yellow h-12 w-12" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
          Vote Received!
        </h1>
        <p className="mt-4 max-w-xs font-medium text-gray-400">
          Your support for{' '}
          <span className="text-brand-yellow">{selectedGirl?.name}</span> has
          been recorded.
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
    <div className="min-h-screen pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 border-b p-4 backdrop-blur-md">
        <div className="">
          <div>
            <h1 className="text-brand-yellow text-lg font-black tracking-tighter uppercase italic">
              {poll?.title || 'Starz Vote'}
            </h1>
            <p className="text-sm font-bold tracking-widest text-gray-500 uppercase">
              Select your favorite
            </p>
          </div>
        </div>
      </header>

      <main className="space-y-6 p-4">
        {/* Search Bar */}
        <div className="group relative">
          <Search className="group-focus-within:text-brand-yellow absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-500 transition-colors" />
          <input
            type="text"
            placeholder="Search contestant name..."
            className="focus:border-brand-yellow w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 pl-12 text-sm transition-all outline-none placeholder:text-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Contestant Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {filteredGirls.map((girl) => (
            <div
              key={girl.id}
              onClick={() => setSelectedGirl(girl)}
              className="group relative aspect-4/5 cursor-pointer overflow-hidden rounded-3xl border border-white/5 shadow-2xl transition-all active:scale-95"
            >
              <img
                src={girl.photo_url}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={girl.name}
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />

              <div className="absolute bottom-0 w-full p-4">
                <p className="text-xs leading-tight font-black tracking-tight text-white uppercase md:text-lg lg:text-xl">
                  {girl.name}
                </p>
                <p className="text-brand-yellow mt-0.5 text-[10px] font-bold uppercase italic">
                  {girl.department}
                </p>
              </div>

              {/* Selection Glow */}
              <div className="border-brand-yellow pointer-events-none absolute inset-0 rounded-3xl border-2 opacity-0 transition-opacity group-hover:opacity-100" />
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
