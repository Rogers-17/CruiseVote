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
      alert("Codes Generated & Saved to DB!");
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
      alert("Export failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-[--color-brand-yellow] mb-2">
          <Zap size={18} fill="currentColor" />
          <h3 className="font-black uppercase tracking-tighter">Bulk Code Generator</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-500 uppercase">Format</label>
            <input 
              value={prefix} 
              onChange={e => setPrefix(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-[--color-brand-yellow] outline-none" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-500 uppercase">Amount</label>
            <input 
              type="number"
              value={isNaN(count) ? "" : count} 
              onChange={e => {
                const val = parseInt(e.target.value);
                setCount(isNaN(val) ? 0 : val);
              }} 
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-[--color-brand-yellow] outline-none" 
            />
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-brand-yellow text-black font-black py-4 rounded-xl uppercase tracking-widest hover:bg-[--color-brand-yellow] transition"
        >
          {loading ? "Generating..." : "Generate Codes"}
        </button>
      </div>

      <button 
        onClick={handleExport}
        className="w-full border border-white/10 text-gray-400 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition"
      >
        <Download size={16} /> Export CSV for Printing
      </button>
    </div>
  );
}