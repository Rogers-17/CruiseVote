'use client';

import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { Calendar, Activity, ChevronRight, Plus } from 'lucide-react';

export default function Polls() {
  const { allPolls, loading } = useApp();

  if (loading) {
    return (
      <div className="p-10 text-center font-black animate-pulse text-[--color-brand-yellow]">
        LOADING ALL CONTESTS...
      </div>
    );
  }

  return (
    <section className="p-4 md:px-6 lg:px-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter uppercase ">
            Poll <span className="text-brand-yellow">Management</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            View and manage all Starz Cruise contests regardless of status.
          </p>
        </div>
        
        <Link 
          href="/home/create-poll"
          className="flex items-center justify-center gap-2 bg-brand-yellow px-6 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
        >
          <Plus size={16} /> Create New Poll
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allPolls?.length > 0 ? (
          allPolls.map((poll: any) => (
            <Link
              href={`/home/polls/${poll.slug}`} 
              key={poll.id}
              className="group"
            >
              <div className="rounded-[2rem] border border-[--border-app] bg-[--card-bg] p-6 transition-all duration-300 hover:border-[--color-brand-yellow] hover:shadow-2xl hover:shadow-[--color-brand-yellow]/5">
                <div className="mb-4 flex items-start justify-between">
                  <h2 className="text-xl font-black uppercase italic tracking-tight transition group-hover:text-[--color-brand-yellow]">
                    {poll.title}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-black tracking-widest ${
                      poll.is_active 
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                        : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                    }`}
                  >
                    {poll.is_active ? 'ACTIVE' : 'CLOSED'}
                  </span>
                </div>

                <p className="mb-6 line-clamp-2 text-sm text-gray-500 font-medium">
                  {poll.description || 'No description provided for this Starz contest.'}
                </p>

                <div className="grid grid-cols-1 gap-2 text-[10px] font-black uppercase tracking-wider text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-brand-yellow" />
                    <span>Starts: {new Date(poll.start_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-3 w-3 text-brand-yellow" />
                    <span>Ends: {new Date(poll.end_date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-4 text-[10px] font-black uppercase tracking-[0.2em] text-brand-yellow group-hover:translate-x-1 transition-transform">
                  <span>Manage Details</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-[--border-app] rounded-[3rem]">
             <p className="text-gray-500 font-bold uppercase tracking-widest">No polls found in the database.</p>
          </div>
        )}
      </div>
    </section>
  );
}