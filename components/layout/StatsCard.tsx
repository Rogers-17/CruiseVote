'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Trophy, TrendingUp } from 'lucide-react';

export default function LiveLeaderboard({ pollId }: { pollId: string }) {
  const { contestants } = useApp();
  
  // Filter for this poll and sort by highest votes
  const pollContestants = contestants
    .filter(c => c.poll_id === pollId)
    .sort((a, b) => b.vote_count - a.vote_count);

  const totalVotes = pollContestants.reduce((acc, curr) => acc + curr.vote_count, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Total Votes Summary Card */}
      <div className="relative overflow-hidden bg-white/5 p-6 rounded-3xl border border-white/10">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">Live Pulse</p>
            <h2 className="text-5xl font-black text-[--color-brand-yellow] italic tracking-tighter">
              {totalVotes.toLocaleString()}
            </h2>
            <p className="text-white/60 text-xs font-bold mt-1">Total Votes Collected</p>
          </div>
          <div className="h-16 w-16 bg-[--color-brand-yellow]/10 rounded-2xl flex items-center justify-center border border-[--color-brand-yellow]/20">
            <TrendingUp className="text-[--color-brand-yellow] w-8 h-8" />
          </div>
        </div>
        {/* Subtle background glow */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[--color-brand-yellow] blur-[60px] opacity-20" />
      </div>

      {/* Leaderboard List */}
      <div className="space-y-5">
        <h3 className="text-white font-black uppercase italic tracking-widest text-xs px-2">Current Standings</h3>
        
        {pollContestants.map((girl, index) => {
          const percentage = totalVotes > 0 ? (girl.vote_count / totalVotes) * 100 : 0;
          const isFirst = index === 0;

          return (
            <div key={girl.id} className="group flex items-center gap-4">
              {/* Rank & Photo Container */}
              <div className="relative flex-shrink-0">
                <div className={`w-14 h-14 rounded-full border-2 p-0.5 transition-all ${isFirst ? 'border-brand-yellow' : 'border-white/10'}`}>
                   <img 
                    src={girl.photo_url} 
                    alt={girl.name} 
                    className="w-full h-full object-cover rounded-full"
                   />
                </div>
                {/* Rank Badge */}
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black border ${
                  isFirst 
                  ? 'bg-brand-yellow text-black border-yellow-400 shadow-lg' 
                  : 'bg-black text-white border-white/20'
                }`}>
                  {index + 1}
                </div>
              </div>

              {/* Stats and Progress */}
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-black uppercase tracking-tight ${isFirst ? 'text-white' : 'text-gray-300'}`}>
                        {girl.name}
                      </span>
                      {isFirst && <Trophy className="w-3 h-3 text-[--color-brand-yellow]" />}
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">{girl.department}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-black text-[--color-brand-yellow] italic">
                      {girl.vote_count.toLocaleString()} <span className="text-[8px] text-gray-500 not-italic uppercase ml-0.5">Votes</span>
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">{percentage.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${isFirst ? 'bg-brand-yellow-primary' : 'bg-gray-600'}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pollContestants.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">No contestants found for this poll</p>
        </div>
      )}
    </div>
  );
}