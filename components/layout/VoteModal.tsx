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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-100 flex items-end md:items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#161616] rounded-[2.5rem] p-8 border border-white/10 animate-in slide-in-from-bottom-20 duration-300">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[--color-brand-yellow]/30">
                <img src={girl.photo_url} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight">Cast Your Vote</h2>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Voting for: <span className="text-brand-yellow">{girl.name}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <Lock className={`w-4 h-4 transition-colors ${error ? 'text-red-500' : 'text-gray-500 group-focus-within:text-brand-yellow'}`} />
            </div>
            <input 
              placeholder="ENTER VOTING CODE" 
              className={`w-full bg-black border ${error ? 'border-red-500' : 'border-white/10 focus:border-brand-yellow'} rounded-2xl py-5 pl-14 pr-4 text-center font-black tracking-[0.4em] text-[--color-brand-yellow] uppercase outline-none transition-all placeholder:text-gray-800 placeholder:tracking-normal`}
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              autoFocus
            />
          </div>

          {error && (
             <p className="text-red-500 text-[10px] font-black uppercase text-center animate-pulse italic">
               ⚠️ {error}
             </p>
          )}
          
          <button 
            onClick={handleVote}
            disabled={loading || code.length < 3}
            className="w-full bg-brand-yellow text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] shadow-2xl shadow-yellow-500/10 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale"
          >
            {loading ? <Loader2 className="mx-auto animate-spin" /> : "Confirm Ballot"}
          </button>
        </div>
      </div>
    </div>
  );
}