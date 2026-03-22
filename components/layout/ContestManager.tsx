'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import * as db from '@/utils/supabase/db';
import { Camera, Plus, Loader2 } from 'lucide-react';

export default function ContestantManager({ pollId }: { pollId: string }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: '', department: '', bio: '' });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Select a photo first!");

    setLoading(true);
    try {
      // 1. Upload to Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('Contestants')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('Contestants')
        .getPublicUrl(filePath);

      // 3. Save to DB
      await db.createContestant({
        ...form,
        photo_url: publicUrl,
        poll_id: pollId
      });

      alert("Contestant Added Successfully!");
      setForm({ name: '', department: '', bio: '' });
      setFile(null);
    } catch (err: any) {
      alert(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <form onSubmit={handleUpload} className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
        <h3 className="text-brand-yellow font-black uppercase tracking-tighter italic">Add New Girl</h3>
        
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 transition">
            {file ? (
              <span className="text-[--color-brand-yellow] font-bold text-sm">{file.name}</span>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Camera className="w-8 h-8 text-gray-500 mb-2" />
                <p className="text-xs text-gray-500 font-bold uppercase">Tap to upload photo</p>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
        </div>

        <input 
          placeholder="Full Name" 
          required
          className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-[--color-brand-yellow] outline-none transition"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
        />
        
        <input 
          placeholder="Department (e.g. IT, Business)" 
          required
          className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-[--color-brand-yellow] outline-none transition"
          value={form.department}
          onChange={e => setForm({...form, department: e.target.value})}
        />

        <button 
          disabled={loading}
          type="submit"
          className="w-full bg-brand-yellow text-black font-black py-4 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[0.98] transition active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Plus size={18}/> Add to Poll</>}
        </button>
      </form>
    </div>
  );
}