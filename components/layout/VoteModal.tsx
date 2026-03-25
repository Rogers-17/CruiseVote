'use client';

import React, { useState } from 'react';
import { Lock, X, Loader2 } from 'lucide-react';
import * as db from '@/utils/supabase/db';

export default function VoteModal({ girl, pollId, onClose, onSuccess }: any) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVote = async () => {
    if (code.length < 3) return;
    setLoading(true);
    setError(null);
    try {
      await db.castVote(pollId, girl.id, code);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center bg-black/90 p-4 backdrop-blur-xl md:items-center">
      <div className="animate-in slide-in-from-bottom-20 w-full max-w-md rounded-[2.5rem] border border-white/10 bg-[#161616] p-8 duration-300">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-2xl border border-[--color-brand-yellow]/30">
              <img
                src={girl.photo_url}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl leading-tight font-black tracking-tighter text-white uppercase italic">
                Cast Your Vote
              </h2>
              <p className="mt-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                Voting for:{' '}
                <span className="text-brand-yellow">{girl.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/5 p-2 text-gray-400 transition hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="group relative">
            <div className="absolute top-1/2 left-5 -translate-y-1/2">
              <Lock
                className={`h-4 w-4 transition-colors ${error ? 'text-red-500' : 'group-focus-within:text-brand-yellow text-gray-500'}`}
              />
            </div>
            <input
              placeholder="ENTER VOTING CODE"
              className={`w-full border bg-black ${error ? 'border-red-500' : 'focus:border-brand-yellow border-white/10'} rounded-2xl py-5 pr-4 pl-14 text-center font-black tracking-[0.4em] text-brand-yellow uppercase transition-all outline-none placeholder:tracking-normal placeholder:text-gray-800`}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              autoFocus
            />
          </div>

          {error && (
            <p className="animate-pulse text-center text-[10px] font-black text-red-500 uppercase italic">
              ⚠️ {error}
            </p>
          )}

          <button
            onClick={handleVote}
            disabled={loading || code.length < 3}
            className="bg-brand-yellow w-full rounded-2xl py-5 font-black tracking-[0.2em] text-black uppercase shadow-2xl shadow-yellow-500/10 transition-all active:scale-95 disabled:opacity-30 disabled:grayscale"
          >
            {loading ? (
              <Loader2 className="mx-auto animate-spin" />
            ) : (
              'Confirm Ballot'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
