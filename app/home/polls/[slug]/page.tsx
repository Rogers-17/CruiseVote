'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Users, Ticket, BarChart3, Settings } from 'lucide-react';
import LiveLeaderboard from '@/components/layout/StatsCard';
import ContestantManager from '@/components/layout/ContestManager';
import CodeManager from '@/components/layout/CodeManager';

// Sub-components we'll build next
// import ContestantList from './components/ContestantList';
// import CodeManager from './components/CodeManager';
// import LiveLeaderboard from './components/LiveLeaderboard';

export default function PollDashboard() {
  const { slug } = useParams(); // Gets the ID from the URL
  const { allPolls, loading } = useApp();
  const [activeTab, setActiveTab] = useState<'contestants' | 'codes' | 'results'>('contestants');

  // Find the specific poll from the global list
  const currentPoll = allPolls.find((p: any) => p.slug === slug);

  if (loading) return <div className="p-20 text-center">Loading Poll Data...</div>;
  if (!currentPoll) return <div className="p-20 text-center text-red-500">Poll not found.</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-brand-yellow uppercase tracking-tight">
              {currentPoll.title}
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentPoll.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {currentPoll.is_active ? 'LIVE' : 'CLOSED'}
            </span>
          </div>
          <p className="text-gray-500 mt-1">{currentPoll.description}</p>
        </div>
        
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition">
             <Settings className="w-4 h-4" /> Edit Poll
           </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-2xl mb-8">
        <MobileTab 
            active={activeTab === 'contestants'} 
            onClick={() => setActiveTab('contestants')}
            label="Girls"
        />
        <MobileTab 
            active={activeTab === 'codes'} 
            onClick={() => setActiveTab('codes')}
            label="Codes"
        />
        <MobileTab 
            active={activeTab === 'results'} 
            onClick={() => setActiveTab('results')}
            label="Stats"
        />
        </div>

      {/* Main Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'contestants' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
             {/* <ContestantList pollId={id as string} /> */}
             <ContestantManager pollId={currentPoll.id} />
          </div>
        )}

        {activeTab === 'codes' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
             {/* <CodeManager pollId={id as string} /> */}
             <CodeManager pollId={currentPoll.id}/>
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
      className={`py-2 text-xs font-bold rounded-xl transition-all ${
        active ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
      }`}
    >
      {label}
    </button>
  );
}