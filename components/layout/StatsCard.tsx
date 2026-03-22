'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Trophy, TrendingUp } from 'lucide-react';
import LivePulseCard from './LivePulseCard';

export default function LiveLeaderboard({ pollId }: { pollId: string }) {
  const { contestants } = useApp();

  // Filter for this poll and sort by highest votes
  const pollContestants = contestants
    .filter((c) => c.poll_id === pollId)
    .sort((a, b) => b.vote_count - a.vote_count);

  const totalVotes = pollContestants.reduce(
    (acc, curr) => acc + curr.vote_count,
    0,
  );

  return (
    <div className="animate-in fade-in space-y-8 duration-700">
      {/* Total Votes Summary Card */}
      <LivePulseCard totalVotes={totalVotes} />

      {/* Leaderboard List */}
      <div className="space-y-5">
        <h3 className="px-2 text-xs font-black tracking-widest text-white uppercase italic">
          Current Standings
        </h3>

        {pollContestants.map((girl, index) => {
          const percentage =
            totalVotes > 0 ? (girl.vote_count / totalVotes) * 100 : 0;
          const isFirst = index === 0;

          return (
            <div key={girl.id} className="group flex items-center gap-4">
              {/* Rank & Photo Container */}
              <div className="relative shrink-0">
                <div
                  className={`h-14 w-14 rounded-full border-2 p-0.5 transition-all ${isFirst ? 'border-brand-yellow' : 'border-white/10'}`}
                >
                  <img
                    src={girl.photo_url}
                    alt={girl.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                {/* Rank Badge */}
                <div
                  className={`absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-md border text-[10px] font-black ${
                    isFirst
                      ? 'bg-brand-yellow border-yellow-400 text-black shadow-lg'
                      : 'border-white/20 bg-black text-white'
                  }`}
                >
                  {index + 1}
                </div>
              </div>

              {/* Stats and Progress */}
              <div className="flex-1 space-y-2">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-black tracking-tight uppercase ${isFirst ? 'text-white' : 'text-gray-300'}`}
                      >
                        {girl.name}
                      </span>
                      {isFirst && (
                        <Trophy className="h-3 w-3 text-[--color-brand-yellow]" />
                      )}
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">
                      {girl.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-black text-[--color-brand-yellow] italic">
                      {girl.vote_count.toLocaleString()}{' '}
                      <span className="ml-0.5 text-[8px] text-gray-500 uppercase not-italic">
                        Votes
                      </span>
                    </span>
                    <span className="font-mono text-[10px] text-gray-500">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full border border-white/5 bg-white/5">
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
        <div className="rounded-3xl border-2 border-dashed border-white/5 py-20 text-center">
          <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
            No contestants found for this poll
          </p>
        </div>
      )}
    </div>
  );
}
