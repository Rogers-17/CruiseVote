'use client';

import * as React from 'react';
import {
  User,
  ShieldCheck,
  Lock,
  Palette,
  Database,
  Trash2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuthUser } from '@/hooks/useAuthUser';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function Settings() {
  const { isAdmin } = useApp();
  const { user } = useAuthUser();

  const SectionHeader = ({
    title,
    icon: Icon,
  }: {
    title: string;
    icon: any;
  }) => (
    <div className="mb-6 flex items-center gap-2 border-b border-white/5 pb-2">
      <Icon className="text-brand-yellow" size={20} />
      <h2 className="text-sm font-black tracking-widest uppercase italic">
        {title}
      </h2>
    </div>
  );

  const SettingRow = ({
    label,
    desc,
    children,
  }: {
    label: string;
    desc: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col justify-between gap-4 border-b py-4 last:border-0 md:flex-row md:items-center">
      <div>
        <p className="text-sm font-bold tracking-tight uppercase">{label}</p>
        <p className="text-xs">{desc}</p>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 max-w-4xl space-y-10 pb-20 duration-500">
      {/* 1. Account Profile */}
      <section className="rounded-3xl border p-6 shadow-2xl">
        <SectionHeader title="Account Profile" icon={User} />
        <div className="space-y-4">
          <SettingRow
            label="Display Name"
            desc="How you appear on the leaderboard and voting pages."
          >
            <input
              type="text"
              placeholder="Charles Glow"
              defaultValue={user?.user_metadata?.display_name || 'Admin'}
              className="focus:border-brand-yellow w-full rounded-xl border px-4 py-2 text-xs transition-all outline-none md:w-64"
            />
          </SettingRow>
          <SettingRow
            label="Email Address"
            desc="Used for security alerts and vote confirmations."
          >
            <input
              type="email"
              disabled
              defaultValue={user?.email || 'guestuser@starz.edu'}
              className="w-full cursor-not-allowed rounded-xl border px-4 py-2 text-xs md:w-64"
            />
          </SettingRow>
        </div>
      </section>

      {/* 2. Visual Preferences */}
      <section className="rounded-3xl border p-6 shadow-2xl">
        <SectionHeader title="Interface & Theme" icon={Palette} />
        <div className="space-y-4">
          <SettingRow
            label="Theme Mode"
            desc="Switch between dark and light interface styles."
          >
            <ThemeToggle />
          </SettingRow>
          <SettingRow
            label="System Language"
            desc="Choose your preferred language for the Starz interface."
          >
            <select className="focus:border-brand-yellow appearance-none rounded-xl border bg-black/40 px-4 py-2 text-xs outline-none">
              <option>English (US)</option>
              <option>French</option>
            </select>
          </SettingRow>
        </div>
      </section>

      {/* 3. Security */}
      <section className="rounded-3xl border bg-white/5 p-6 shadow-2xl">
        <SectionHeader title="Security" icon={Lock} />
        <div className="space-y-4">
          <SettingRow
            label="Two-Factor Auth"
            desc="Add an extra layer of security to your account."
          >
            <div className="group relative h-6 w-11 cursor-pointer rounded-full">
              <div className="absolute top-1 left-1 h-4 w-4 rounded-full transition-all group-hover:bg-white" />
            </div>
          </SettingRow>
        </div>
      </section>

      {/* 4. ADMIN ONLY SECTION */}
      {isAdmin && (
        <section className="rounded-3xl border border-red-500/2 bg-red-500/5 p-6 shadow-2xl">
          <SectionHeader title="Admin Controls" icon={ShieldCheck} />
          <div className="space-y-4">
            <SettingRow
              label="Maintenance Mode"
              desc="Disable public voting and display a maintenance screen."
            >
              <div className="relative h-6 w-11 cursor-pointer rounded-full border border-red-500/40 bg-red-500/20">
                <div className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500" />
              </div>
            </SettingRow>
            <SettingRow
              label="Database Backup"
              desc="Generate a full snapshot of the current voting data."
            >
              <button className="flex items-center gap-2 rounded-xl border bg-white/5 px-6 py-2 text-[10px] font-black tracking-widest uppercase transition-all hover:bg-white/10">
                <Database size={14} /> Run Backup
              </button>
            </SettingRow>
            <SettingRow
              label="Clear Logs"
              desc="Permanently delete system activity logs older than 30 days."
            >
              <button className="flex items-center gap-2 text-[10px] font-black tracking-widest text-red-500 uppercase hover:text-red-400">
                <Trash2 size={14} /> Purge History
              </button>
            </SettingRow>
          </div>
        </section>
      )}
    </div>
  );
}
