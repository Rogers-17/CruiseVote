'use client';

import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { Calendar, Activity } from 'lucide-react';

export default function Polls() {
  const { allPolls, loading } = useApp();

  if (loading) return <div className="p-10 text-center">Loading Polls...</div>;
  const activePoll = allPolls.find((poll: any) => poll.is_active);

  return (
    <section>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-200">
            Poll Management
          </h1>
          <p className="text-gray-500">
            View and manage all Starz University contests.
          </p>
        </div>
        <Link
          href="/home/create-poll"
          className="bg-brand-yellow hover:bg-brand-yellow-primary rounded-lg px-4 py-2 font-bold text-black transition"
        >
          + Create
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activePoll && (
          <Link
            href={`polls/${activePoll.slug}`}
            key={activePoll.slug}
            className="group"
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-500 hover:shadow-lg">
              <div className="mb-4 flex items-start justify-between">
                <h2 className="text-xl font-bold text-gray-800 transition group-hover:text-blue-600">
                  {activePoll.title}
                </h2>
                <span
                  className={`rounded-md px-2 py-1 text-xs font-bold ${activePoll.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  {activePoll.is_active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>

              <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                {activePoll.description || 'No description provided.'}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(activePoll.start_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span>
                    Ends: {new Date(activePoll.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-50 pt-4 text-sm font-semibold text-blue-600">
                <span>Manage Details</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
