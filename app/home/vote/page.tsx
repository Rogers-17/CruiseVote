'use client';

import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { Calendar, Activity, Vote, ChevronRight, Lock } from 'lucide-react'; 

export default function VotePollSelection() {
  const { allPolls, loading } = useApp(); 

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-pulse text-[--color-brand-yellow] font-black italic tracking-tighter text-2xl">
          LOADING STARZ CONTESTS...
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white p-6 pb-20">
      <header className="mb-12 max-w-4xl mx-auto text-center">
        <div className="inline-block bg-[--color-brand-yellow]/10 border border-[--color-brand-yellow]/20 px-3 py-1 rounded-full mb-4">
          <p className="text-[--color-brand-yellow] text-[10px] font-black uppercase tracking-[0.3em]">Official Voting Portal</p>
        </div>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white">
          Active <span className="text-[--color-brand-yellow]">Polls</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">Select a contest below to cast your official vote.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {allPolls.map((poll: any) => (
          <Link 
            href={poll.is_active ? `vote/${poll.id}` : '#'} 
            key={poll.id} 
            className={`group relative ${!poll.is_active ? 'cursor-not-allowed opacity-60' : ''}`}
          >
            <div className={`h-full bg-white/5 border ${poll.is_active ? 'border-white/10 group-hover:border-[--color-brand-yellow]/50 group-hover:bg-white/10' : 'border-white/5'} rounded-[2rem] p-8 transition-all duration-300 shadow-2xl`}>
              
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl ${poll.is_active ? 'bg-[--color-brand-yellow] text-black' : 'bg-gray-800 text-gray-500'}`}>
                  <Vote size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${
                  poll.is_active 
                  ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                  : 'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                  {poll.is_active ? '● Live Now' : 'Closed'}
                </span>
              </div>

              <h2 className={`text-2xl font-black uppercase italic tracking-tight mb-2 transition-colors ${poll.is_active ? 'text-white group-hover:text-[--color-brand-yellow]' : 'text-gray-500'}`}>
                {poll.title}
              </h2>

              <p className="text-gray-400 text-sm line-clamp-2 mb-8 font-medium">
                {poll.description || "No description provided for this Starz University contest."}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>Started: {new Date(poll.start_date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {poll.is_active ? (
                  <div className="flex items-center gap-1 text-[--color-brand-yellow] font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    Enter Booth <ChevronRight size={16} />
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-gray-600 font-black text-xs uppercase tracking-widest">
                    <Lock size={14} /> Closed
                  </div>
                )}
              </div>
            </div>
            
            {/* Background Glow Effect on Hover */}
            {poll.is_active && (
              <div className="absolute -inset-1 bg-gradient-to-r from-[--color-brand-yellow] to-yellow-600 rounded-[2rem] blur opacity-0 group-hover:opacity-10 transition duration-500" />
            )}
          </Link>
        ))}
      </div>

      {allPolls.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
          <p className="text-gray-600 font-black uppercase tracking-widest">No contests available at this time.</p>
        </div>
      )}
    </section>
  );
}