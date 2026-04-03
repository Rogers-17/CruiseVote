'use client';

import * as React from 'react';
import * as db from '@/utils/supabase/db';
import { useApp } from '@/context/AppContext';
import { Download, Zap, Ticket, CheckCircle2, Clock } from 'lucide-react';

export default function CodeManager({ pollId }: { pollId: string }) {
  const { allCodes, retry } = useApp(); // Get codes from context
  const [prefix, setPrefix] = React.useState('SC-');
  const [count, setCount] = React.useState(100);
  const [loading, setLoading] = React.useState(false);

  // Filter codes specifically for this poll
  const pollCodes = React.useMemo(() => {
    return allCodes.filter((c: db.VoteCode) => c.poll_id === pollId);
  }, [allCodes, pollId]);

  const handleGenerate = async () => {
    if (!confirm(`Generate ${count} codes starting with ${prefix}?`)) return;
    setLoading(true);
    try {
      await db.generateFormattedCodes(pollId, prefix, count);
      retry();
      alert('Codes Generated & Saved to DB!');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const csv = await db.exportCodesAsCSV(pollId);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Starz-Codes-${new Date().getTime()}.csv`;
      a.click();
    } catch (err) {
      alert('Export failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Generator Section */}
      <div className="space-y-4 rounded-3xl border border-[--border-app] bg-[--card-bg] p-6">
        <div className="text-brand-yellow mb-2 flex items-center gap-2">
          <Zap size={18} fill="currentColor" />
          <h3 className="font-black tracking-tighter uppercase italic">
            Bulk Code Generator
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="pl-1 text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Format
            </label>
            <input
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="focus:border-brand-yellow w-full rounded-xl border border-[--border-app] bg-transparent p-3 text-sm transition-all outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="pl-1 text-[10px] font-black tracking-widest text-gray-500 uppercase">
              Amount
            </label>
            <input
              type="number"
              value={isNaN(count) ? '' : count}
              onChange={(e) => setCount(parseInt(e.target.value) || 0)}
              className="focus:border-brand-yellow w-full rounded-xl border border-[--border-app] bg-transparent p-3 text-sm transition-all outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-brand-yellow w-full rounded-xl py-4 font-black tracking-widest text-black uppercase transition hover:scale-[0.98] active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Generate Codes'}
        </button>
      </div>

      <button
        onClick={handleExport}
        className="border-app flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-[10px] font-black tracking-[0.2em] uppercase transition hover:bg-white/5 active:bg-white/10"
      >
        <Download size={14} /> Export CSV for Printing
      </button>

      {/* Codes List Section */}
      <div className="border-app bg-app overflow-hidden rounded-3xl border">
        <div className="border-app flex items-center justify-between border-b bg-white/5 p-5">
          <h4 className="flex items-center gap-2 text-xs font-black tracking-widest uppercase">
            <Ticket size={14} className="text-brand-yellow" />
            Generated Codes ({pollCodes.length})
          </h4>
        </div>

        <div className="custom-scrollbar max-h-100 overflow-y-auto">
          {pollCodes.length > 0 ? (
            <table className="w-full border-collapse text-left">
              <thead className="bg-app sticky top-0 z-10 backdrop-blur-xl">
                <tr className="border-app border-b text-[9px] tracking-widest text-gray-500 uppercase">
                  <th className="px-6 py-3">Code</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date Used</th>
                </tr>
              </thead>
              <tbody className="divide-app divide-y">
                {pollCodes.map((item: any) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-white/5"
                  >
                    <td className="px-6 py-4 text-xs font-black tracking-tight">
                      {item.code}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[9px] font-black tracking-tighter uppercase ${
                          item.is_used
                            ? 'border-red-500/20 bg-red-500/10 text-red-500'
                            : 'border-green-500/20 bg-green-500/10 text-green-500'
                        }`}
                      >
                        {item.is_used ? (
                          <CheckCircle2 size={10} />
                        ) : (
                          <Clock size={10} />
                        )}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-bold text-gray-500">
                      {item.used_at
                        ? new Date(item.used_at).toLocaleString([], {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center p-20 text-center opacity-30">
              <Ticket size={40} className="mb-2" />
              <p className="text-[10px] font-black tracking-[0.3em] uppercase">
                No codes generated yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
