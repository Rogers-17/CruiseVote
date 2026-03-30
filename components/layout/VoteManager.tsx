'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Search, CheckCircle2, Timer, Lock } from 'lucide-react';
import VoteModal from '@/components/layout/VoteModal';

export default function PublicVotePage({ pollId }: { pollId: string }) {
  const { slug } = useParams();
  const { contestants, allPolls, loading } = useApp();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedGirl, setSelectedGirl] = React.useState<any>(null);
  const [voted, setVoted] = React.useState(false);
  
  // --- Countdown State ---
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isExpired, setIsExpired] = React.useState(false);

  const poll = allPolls.find((p: any) => p.slug === slug);

  // Logic to calculate time remaining
  React.useEffect(() => {
    if (!poll?.end_date) return;

    const timer = setInterval(() => {
      const end = new Date(poll.end_date).getTime();
      const now = new Date().getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsExpired(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [poll]);

  const filteredGirls = contestants
    .filter((c) => c.poll_id === poll?.id)
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) return <div className="text-brand-yellow flex min-h-screen items-center justify-center bg-black font-black italic">LOADING BALLOT...</div>;

  if (voted) {
    return (
      <div className="animate-in fade-in zoom-in flex min-h-screen flex-col items-center justify-center p-6 text-center duration-500">
        <div className="border-brand-yellow/20 bg-brand-yellow/10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border">
          <CheckCircle2 className="text-brand-yellow h-12 w-12" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Vote Received!</h1>
        <button onClick={() => setVoted(false)} className="mt-10 rounded-full border px-8 py-3 text-xs font-black tracking-widest uppercase transition hover:bg-white/10">Vote for someone else</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 border-b p-4 backdrop-blur-md flex justify-between items-center">
        <div>
          <h1 className="text-brand-yellow text-lg font-black tracking-tighter uppercase italic">{poll?.title || 'Starz Vote'}</h1>
          <p className="text-[10px] font-bold tracking-widest uppercase">Select your favorite</p>
        </div>

        {/* --- THE COUNTDOWN UI --- */}
        {!isExpired ? (
          <div className="flex gap-2 text-center">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Mins', val: timeLeft.mins },
              { label: 'Secs', val: timeLeft.secs }
            ].map((t) => (
              <div key={t.label} className=" border border-gray-400 rounded-lg p-1 min-w-8.75">
                <p className="text-md font-black leading-none">{t.val}</p>
                <p className="text-[10px] font-bold text-gray-500">{t.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
            <Lock size={12} className="text-red-500" />
            <span className="text-red-500 text-[9px] font-black uppercase tracking-widest">Voting Closed</span>
          </div>
        )}
      </header>

      <main className="space-y-6 p-4">
        {isExpired && (
            <div className="bg-red-500/20 border border-red-500/40 p-4 rounded-2xl text-center">
                <p className="text-red-200 text-xs font-bold uppercase tracking-widest">This poll has ended. Voting is no longer permitted.</p>
            </div>
        )}

        <div className={`group relative transition-opacity ${isExpired ? 'opacity-30 pointer-events-none' : ''}`}>
          <Search className="group-focus-within:text-brand-yellow absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-500 transition-colors" />
          <input
            type="text"
            placeholder="Search contestant name..."
            className="focus:border-brand-yellow w-full rounded-2xl border bg-white/5 py-4 pr-4 pl-12 text-sm transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={`grid grid-cols-2 gap-4 md:grid-cols-4 transition-all ${isExpired ? 'grayscale opacity-50' : ''}`}>
          {filteredGirls.map((girl) => (
            <div
              key={girl.id}
              onClick={() => !isExpired && setSelectedGirl(girl)} // Disable click if expired
              className={`group relative aspect-4/5 overflow-hidden rounded-3xl border border-white/5 shadow-2xl transition-all ${isExpired ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
            >
              <img src={girl.photo_url} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={girl.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 w-full p-4">
                <p className="text-xs font-black tracking-tight text-white uppercase md:text-lg">{girl.name}</p>
                <p className="text-brand-yellow text-[10px] font-bold uppercase italic">{girl.department}</p>
              </div>
              {!isExpired && 
              <div className="border-brand-yellow pointer-events-none absolute inset-0 rounded-3xl border-2 opacity-0 transition-opacity group-hover:opacity-100" />}
            </div>
          ))}
        </div>
      </main>

      {selectedGirl && !isExpired && (
        <VoteModal
          girl={selectedGirl}
          pollId={poll.id}
          onClose={() => setSelectedGirl(null)}
          onSuccess={() => setVoted(true)}
        />
      )}
    </div>
  );
}