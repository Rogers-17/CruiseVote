'use client';

import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { Calendar, Vote, ChevronRight, Lock } from 'lucide-react';

export default function VotePollSelection() {
  const { allPolls, loading } = useApp();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-brand-yellow animate-pulse text-2xl font-black tracking-tighter italic">
          LOADING STARZ CONTESTS...
        </div>
      </div>
    );
  }

  return (
    <section className="p-6 pb-20">
      <header className="mb-12">
        <div className="border-brand-yellow/20 bg-brand-yellow/10 mb-4 inline-block rounded-full border px-3 py-1">
          <p className="text-brand-yellow text-[10px] font-black tracking-[0.3em] uppercase">
            Official Voting Portal
          </p>
        </div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic">
          Active <span className="text-brand-yellow">Polls</span>
        </h1>
        <p className="mt-2 font-medium text-gray-500">
          Select a contest below to cast your official vote.
        </p>
      </header>

      <div className="grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {allPolls.map((poll: any) => (
          <Link
            href={poll.is_active ? `vote/${poll.id}` : '#'}
            key={poll.id}
            className={`group relative ${!poll.is_active ? 'cursor-not-allowed opacity-60' : ''}`}
          >
            <div
              className={`h-full border bg-white/5 ${poll.is_active ? 'group-hover:border-brand-yellow/50 group-hover:bg-white/10' : 'border-white/5'} rounded-4xl p-8 shadow-2xl transition-all duration-300`}
            >
              <div className="mb-6 flex items-start justify-between">
                <div
                  className={`rounded-2xl p-3 ${poll.is_active ? 'bg-brand-yellow' : 'bg-gray-800'}`}
                >
                  <Vote size={24} />
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-black tracking-widest uppercase ${
                    poll.is_active
                      ? 'border-green-500/20 bg-green-500/10 text-green-500'
                      : 'border-red-500/20 bg-red-500/10 text-red-500'
                  }`}
                >
                  {poll.is_active ? '● Live Now' : 'Closed'}
                </span>
              </div>

              <h2
                className={`mb-2 text-2xl font-black tracking-tight uppercase italic transition-colors ${poll.is_active ? 'group-hover:text-[--color-brand-yellow]' : 'text-gray-500'}`}
              >
                {poll.title}
              </h2>

              <p className="mb-8 line-clamp-2 text-sm font-medium text-gray-400">
                {poll.description ||
                  'No description provided for this Starz University contest.'}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Started: {new Date(poll.start_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {poll.is_active ? (
                  <div className="text-brand-yellow flex items-center gap-1 text-xs font-black tracking-widest uppercase transition-transform group-hover:translate-x-1">
                    Enter Booth <ChevronRight size={16} />
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs font-black tracking-widest text-gray-600 uppercase">
                    <Lock size={14} /> Closed
                  </div>
                )}
              </div>
            </div>

            {/* Background Glow Effect on Hover */}
            {poll.is_active && (
              <div className="from-brand-yellow absolute -inset-1 rounded-4xl bg-linear-to-r to-yellow-600 opacity-0 blur transition duration-500 group-hover:opacity-10" />
            )}
          </Link>
        ))}
      </div>

      {allPolls.length === 0 && (
        <div className="rounded-[3rem] border-2 border-dashed border-white/5 py-20 text-center">
          <p className="font-black tracking-widest text-gray-600 uppercase">
            No contests available at this time.
          </p>
        </div>
      )}
    </section>
  );
}
