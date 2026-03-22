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
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-200">Poll Management</h1>
          <p className="text-gray-500">View and manage all Starz University contests.</p>
        </div>
        <Link 
          href="/home/create-poll" 
          className="bg-brand-yellow text-black px-4 py-2 rounded-lg font-bold hover:bg-brand-yellow-primary transition"
        >
          + Create
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePoll && (
          <Link href={`polls/${activePoll.slug}`} key={activePoll.slug} className="group">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 transition-all hover:border-blue-500 hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                  {activePoll.title}
                </h2>
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${activePoll.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {activePoll.is_active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>

              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {activePoll.description || "No description provided."}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(activePoll.start_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>Ends: {new Date(activePoll.end_date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t border-gray-50 flex justify-between items-center text-blue-600 font-semibold text-sm">
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