'use client';

import * as React from 'react';
import { TrendingUp, Zap } from 'lucide-react';

export default function LivePulseCard({ totalVotes }: { totalVotes: number }) {
  const [isPulsing, setIsPulsing] = React.useState(false);

  // Trigger the pulse animation whenever totalVotes changes
  React.useEffect(() => {
    if (totalVotes > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [totalVotes]);

  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] border p-8 transition-all duration-500 ${
        isPulsing
          ? 'border-brand-yellow/40 bg-brand-yellow/10 scale-[1.02]'
          : ''
      }`}
    >
      {/* Dynamic Background Glow */}
      <div
        className={`bg-brand-yellow absolute -top-10 -right-10 h-40 w-40 blur-[80px] transition-opacity duration-700 ${
          isPulsing ? 'opacity-40' : 'opacity-10'
        }`}
      />

      {/* Animated Pulse Ring (Visible only when voting) */}
      {isPulsing && (
        <div className="border-brand-yellow absolute inset-0 animate-ping rounded-[2.5rem] border-2 opacity-20" />
      )}

      <div className="relative z-10 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${isPulsing ? 'bg-brand-yellow animate-pulse' : 'bg-green-500'}`}
            />
            <p className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">
              {isPulsing ? 'Receiving Vote...' : 'Live Pulse'}
            </p>
          </div>

          <h2
            className={`text-6xl font-black tracking-tighter italic transition-colors duration-300 ${
              isPulsing ? 'text-white' : 'text-brand-yellow'
            }`}
          >
            {totalVotes.toLocaleString()}
          </h2>

          <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
            Starz Official Count
          </p>
        </div>

        <div
          className={`flex h-20 w-20 items-center justify-center rounded-3xl border-2 transition-all duration-500 ${
            isPulsing
              ? 'border-brand-yellow bg-brand-yellow rotate-12'
              : 'rotate-0 border-white/10 bg-white/5'
          }`}
        >
          {isPulsing ? (
            <Zap className="h-10 w-10 fill-current text-black" />
          ) : (
            <TrendingUp className="text-brand-yellow h-10 w-10" />
          )}
        </div>
      </div>

      {/* Decorative "Voltage" Bar at bottom */}
      <div className="via-brand-yellow absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent to-transparent opacity-30" />
    </div>
  );
}
