'use client';

import * as React from 'react';
import * as db from '@/utils/supabase/db';
import { Download, Zap } from 'lucide-react';

export default function CodeManager({ pollId }: { pollId: string }) {
  const [prefix, setPrefix] = React.useState('StarzCruise-');
  const [count, setCount] = React.useState(100);
  const [loading, setLoading] = React.useState(false);

  const handleGenerate = async () => {
    if (!confirm(`Generate ${count} codes starting with ${prefix}?`)) return;
    setLoading(true);
    try {
      await db.generateFormattedCodes(pollId, prefix, count);
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
      <div className="space-y-4 rounded-2xl border p-6">
        <div className="text-brand-yellow mb-2 flex items-center gap-2">
          <Zap size={18} fill="currentColor" />
          <h3 className="font-black tracking-tighter uppercase">
            Bulk Code Generator
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-500 uppercase">
              Format
            </label>
            <input
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full rounded-xl border p-3 text-sm outline-none focus:border-[--color-brand-yellow]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-500 uppercase">
              Amount
            </label>
            <input
              type="number"
              value={isNaN(count) ? '' : count}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setCount(isNaN(val) ? 0 : val);
              }}
              className="w-full rounded-xl border p-3 text-sm outline-none focus:border-[--color-brand-yellow]"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-brand-yellow w-full rounded-xl py-4 font-black tracking-widest uppercase transition hover:bg-[--color-brand-yellow]"
        >
          {loading ? 'Generating...' : 'Generate Codes'}
        </button>
      </div>

      <button
        onClick={handleExport}
        className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 font-bold transition hover:bg-white/5"
      >
        <Download size={16} /> Export CSV for Printing
      </button>
    </div>
  );
}
