'use client';

import * as React from 'react';
import { 
  User, 
  Moon, 
  Sun, 
  ShieldCheck, 
  Bell, 
  Lock, 
  Palette, 
  Database, 
  Globe,
  Save,
  Trash2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuthUser } from '@/hooks/useAuthUser';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function Settings() {
  const { isAdmin } = useApp();
  const { user  } = useAuthUser();
 const [isDarkMode, setIsDarkMode] = React.useState(true); // Default to your brand's dark aesthetic

  const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
      <Icon className="text-brand-yellow" size={20} />
      <h2 className="text-sm font-black uppercase tracking-widest italic">{title}</h2>
    </div>
  );

  const SettingRow = ({ label, desc, children }: { label: string, desc: string, children: React.ReactNode }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b last:border-0">
      <div>
        <p className="text-sm font-bold uppercase tracking-tight">{label}</p>
        <p className="text-xs">{desc}</p>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  );

  return (
    <div className="max-w-4xl space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Account Profile */}
      <section className=" border  rounded-3xl p-6 shadow-2xl">
        <SectionHeader title="Account Profile" icon={User} />
        <div className="space-y-4">
          <SettingRow label="Display Name" desc="How you appear on the leaderboard and voting pages.">
            <input 
              type="text" 
              placeholder="Charles Glow" 
              defaultValue={user?.user_metadata?.display_name || 'Admin'}
              className=" border  rounded-xl px-4 py-2 text-xs outline-none focus:border-brand-yellow transition-all w-full md:w-64"
            />
          </SettingRow>
          <SettingRow label="Email Address" desc="Used for security alerts and vote confirmations.">
            <input 
              type="email" 
              disabled
              defaultValue={user?.email || 'guestuser@starz.edu'} 
              className=" border  rounded-xl px-4 py-2 text-xs w-full md:w-64 cursor-not-allowed"
            />
          </SettingRow>
        </div>
      </section>

      {/* 2. Visual Preferences */}
      <section className=" border  rounded-3xl p-6 shadow-2xl">
        <SectionHeader title="Interface & Theme" icon={Palette} />
        <div className="space-y-4">
          <SettingRow label="Theme Mode" desc="Switch between dark and light interface styles.">
            <ThemeToggle />
          </SettingRow>
          <SettingRow label="System Language" desc="Choose your preferred language for the Starz interface.">
            <select className="bg-black/40 border  rounded-xl px-4 py-2 text-xs outline-none focus:border-brand-yellow appearance-none">
              <option>English (US)</option>
              <option>French</option>
            </select>
          </SettingRow>
        </div>
      </section>

      {/* 3. Security */}
      <section className="bg-white/5 border  rounded-3xl p-6 shadow-2xl">
        <SectionHeader title="Security" icon={Lock} />
        <div className="space-y-4">
          <SettingRow label="Two-Factor Auth" desc="Add an extra layer of security to your account.">
            <div className="h-6 w-11  rounded-full relative cursor-pointer group">
                <div className="absolute left-1 top-1 h-4 w-4 rounded-full group-hover:bg-white transition-all" />
            </div>
          </SettingRow>
        </div>
      </section>

      {/* 4. ADMIN ONLY SECTION */}
      {isAdmin && (
        <section className="bg-red-500/5 border border-red-500/2 rounded-3xl p-6 shadow-2xl">
          <SectionHeader title="Admin Controls" icon={ShieldCheck} />
          <div className="space-y-4">
            <SettingRow label="Maintenance Mode" desc="Disable public voting and display a maintenance screen.">
               <div className="h-6 w-11 bg-red-500/20 border border-red-500/40 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 h-4 w-4 bg-red-500 rounded-full" />
               </div>
            </SettingRow>
            <SettingRow label="Database Backup" desc="Generate a full snapshot of the current voting data.">
              <button className="bg-white/5 hover:bg-white/10 border  text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-xl transition-all flex items-center gap-2">
                <Database size={14} /> Run Backup
              </button>
            </SettingRow>
            <SettingRow label="Clear Logs" desc="Permanently delete system activity logs older than 30 days.">
              <button className="text-red-500 hover:text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Trash2 size={14} /> Purge History
              </button>
            </SettingRow>
          </div>
        </section>
      )}

      {/* Save Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 z-50">
        <button className="bg-brand-yellow  px-8 py-4 rounded-full font-black uppercase tracking-tighter italic flex items-center gap-3 shadow-2xl shadow-brand-yellow/20 active:scale-95 transition-all">
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}