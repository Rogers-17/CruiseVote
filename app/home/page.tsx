'use client';

import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { Calendar, Activity, ChevronRight, Plus } from 'lucide-react';

export default function Polls() {
  const { allPolls, loading } = useApp();

  if (loading) {
    return (
      <div className="animate-pulse p-10 text-center font-black text-[--color-brand-yellow]">
        LOADING ALL CONTESTS...
      </div>
    );
  }

  return (
    <section className="p-4 md:px-6 lg:px-8">
      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter uppercase">
            Poll <span className="text-brand-yellow">Management</span>
          </h1>
          <p className="text-sm font-medium text-gray-500">
            View and manage all Starz Cruise contests regardless of status.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allPolls?.length > 0 ? (
          allPolls.map((poll: any) => (
            <Link
              href={`/home/${poll.slug}`}
              key={poll.id}
              className="group"
            >
              <div className="rounded-[2rem] border border-[--border-app] bg-[--card-bg] p-6 transition-all duration-300 hover:border-[--color-brand-yellow] hover:shadow-[--color-brand-yellow]/5 hover:shadow-2xl">
                <div className="mb-4 flex items-start justify-between">
                  <h2 className="text-xl font-black tracking-tight uppercase italic transition group-hover:text-[--color-brand-yellow]">
                    {poll.title}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-black tracking-widest ${
                      poll.is_active
                        ? 'border border-green-500/20 bg-green-500/10 text-green-500'
                        : 'border border-gray-500/20 bg-gray-500/10 text-gray-500'
                    }`}
                  >
                    {poll.is_active ? 'ACTIVE' : 'CLOSED'}
                  </span>
                </div>

                <p className="mb-6 line-clamp-2 text-sm font-medium text-gray-500">
                  {poll.description ||
                    'No description provided for this Starz contest.'}
                </p>

                <div className="grid grid-cols-1 gap-2 text-[10px] font-black tracking-wider text-gray-500 uppercase">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-brand-yellow h-3 w-3" />
                    <span>
                      Starts: {new Date(poll.start_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="text-brand-yellow h-3 w-3" />
                    <span>
                      Ends: {new Date(poll.end_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-brand-yellow mt-6 flex items-center justify-between border-t pt-4 text-[10px] font-black tracking-[0.2em] uppercase transition-transform group-hover:translate-x-1">
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full rounded-[3rem] border-2 border-dashed border-[--border-app] py-20 text-center">
            <p className="font-bold tracking-widest text-gray-500 uppercase">
              No polls found in the database.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
