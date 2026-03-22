'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function LiveLeaderboard({ pollId }: { pollId: string }) {
  const { contestants } = useApp();
  
  // Filter contestants for this specific poll and sort by highest votes
  const pollContestants = contestants
    .filter(c => c.poll_id === pollId)
    .sort((a, b) => b.vote_count - a.vote_count);

  const totalVotes = pollContestants.reduce((acc, curr) => acc + curr.vote_count, 0);

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
        <p className="text-gray-400 text-xs uppercase font-black tracking-widest">Total Votes Cast</p>
        <h2 className="text-4xl font-black text-[--color-brand-yellow]">{totalVotes.toLocaleString()}</h2>
      </div>

      <div className="space-y-4">
        {pollContestants.map((girl, index) => {
          const percentage = totalVotes > 0 ? (girl.vote_count / totalVotes) * 100 : 0;
          return (
            <div key={girl.id} className="relative">
              <div className="flex justify-between items-end mb-1 px-1">
                <span className="text-sm font-bold text-white">
                  {index + 1}. {girl.name}
                </span>
                <span className="text-xs font-mono text-[--color-brand-yellow]">
                  {girl.vote_count} votes ({percentage.toFixed(1)}%)
                </span>
              </div>
              {/* Progress Bar Background */}
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                {/* Brand Yellow Fill */}
                <div 
                  className="h-full bg-[--color-brand-yellow-primary] transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}