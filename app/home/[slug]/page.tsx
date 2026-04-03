'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import LiveLeaderboard from '@/components/layout/StatsCard';
import VoteManager from '@/components/layout/VoteManager';

export default function PollDashboard() {
  const { slug } = useParams(); // Gets the ID from the URL
  const { allPolls, loading } = useApp();
  const [activeTab, setActiveTab] = React.useState<'vote' | 'results'>('vote');

  // Find the specific poll from the global list
  const currentPoll = allPolls.find((p: any) => p.slug === slug);

  if (loading)
    return <div className="p-20 text-center">Loading Poll Data...</div>;
  if (!currentPoll)
    return <div className="p-20 text-center text-red-500">Poll not found.</div>;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-brand-yellow text-3xl font-black tracking-tight uppercase">
              {currentPoll.title}
            </h1>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${currentPoll.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {currentPoll.is_active ? 'LIVE' : 'CLOSED'}
            </span>
          </div>
          <p className="mt-1 text-gray-500">{currentPoll.description}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 grid grid-cols-2 gap-1 rounded-2xl bg-gray-100 p-1">
        <MobileTab
          active={activeTab === 'vote'}
          onClick={() => setActiveTab('vote')}
          label="Vote"
        />
        <MobileTab
          active={activeTab === 'results'}
          onClick={() => setActiveTab('results')}
          label="Results"
        />
      </div>

      {/* Main Content Area */}
      <div className="min-h-100">
        {activeTab === 'vote' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* <CodeManager pollId={id as string} /> */}
            <VoteManager pollId={currentPoll.id} />
          </div>
        )}

        {activeTab === 'results' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* <LiveLeaderboard pollId={id as string} /> */}
            <LiveLeaderboard pollId={currentPoll.id} />
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Component for Tabs
function MobileTab({ active, onClick, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl py-2 text-xs font-bold transition-all ${
        active ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
      }`}
    >
      {label}
    </button>
  );
}
