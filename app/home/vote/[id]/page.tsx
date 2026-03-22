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
    .filter(c => c.poll_id === id)
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[--color-brand-yellow] font-black italic">LOADING BALLOT...</div>;

  if (voted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-[--color-brand-yellow]/10 rounded-full flex items-center justify-center mb-6 border border-[--color-brand-yellow]/20">
          <CheckCircle2 className="w-12 h-12 text-[--color-brand-yellow]" />
        </div>
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Vote Received!</h1>
        <p className="text-gray-400 mt-4 max-w-xs font-medium">Your support for <span className="text-[--color-brand-yellow]">{selectedGirl?.name}</span> has been recorded.</p>
        <button 
          onClick={() => setVoted(false)} 
          className="mt-10 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/10 transition"
        >
          Vote for someone else
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/5 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
           <div>
              <h1 className="text-lg font-black uppercase italic tracking-tighter text-[--color-brand-yellow]">
                {poll?.title || 'Starz Vote'}
              </h1>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Select your favorite</p>
           </div>
           <Vote className="text-[--color-brand-yellow] w-5 h-5" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[--color-brand-yellow] transition-colors" />
          <input 
            type="text"
            placeholder="Search contestant name..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-[--color-brand-yellow] outline-none transition-all placeholder:text-gray-600"
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
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 active:scale-95 transition-all cursor-pointer shadow-2xl"
            >
              <img 
                src={girl.photo_url} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={girl.name} 
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 p-4 w-full">
                <p className="text-xs font-black uppercase tracking-tight text-white leading-tight">
                  {girl.name}
                </p>
                <p className="text-[10px] text-[--color-brand-yellow] font-bold uppercase italic mt-0.5">
                  {girl.department}
                </p>
              </div>

              {/* Selection Glow */}
              <div className="absolute inset-0 border-2 border-[--color-brand-yellow] opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {filteredGirls.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-bold uppercase text-xs">No contestants found</p>
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