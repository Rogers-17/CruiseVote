import {
  ContestantPayload,
  DeviceVotesCount,
  GetContestant,
  UpdateContestPayload,
  Votes,
} from '@/lib/type';
import { supabase } from './client';
// import FingerprintJS from '@fingerprintjs/fingerprintjs';

export interface VoteCode {
  id: string;
  code: string;
  poll_id: string;
  is_used: boolean;
  status: 'available' | 'voted' | 'void'; 
  created_at: string;
  used_at: string | null; 
}
export type VoteCodesList = VoteCode[];

export async function healthCheck(): Promise<string> {
  const { error } = await supabase.from('contestants').select('id').limit(1);

  if (error) throw new Error(error.message);
  return 'ok';
}

export async function getVotes(): Promise<Votes[]> {
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw new Error('Failed to fetch votes.');
  return data;
}

export async function getContestants(): Promise<GetContestant[]> {
  const { data, error } = await supabase
    .from('contestants')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw new Error('Failed to fetch contestants');
  return data;
}

export async function createContestant({
  name,
  photo_url,
  department,
  bio,
  poll_id, // Added to match new schema
}: ContestantPayload & { poll_id: string }) {
  const { data, error } = await supabase
    .from('contestants')
    .insert([{ name, photo_url, department, bio, poll_id }])
    .select();
  if (error) throw new Error('Failed to create contestant');
  return data;
}

export async function updateContestant({ id, updates }: UpdateContestPayload) {
  const { data, error } = await supabase
    .from('contestants')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw new Error('Failed to update contestant');
  return data;
}

// --- ADDED/UPDATED POLL LOGIC ---

export async function getActivePoll() {
  const { data, error } = await supabase
    .from('polls')
    .select('*')
    .eq('is_active', true)
    .single();
  return { data, error };
}

export async function getAllPolls() {
  const { data, error } = await supabase
    .from('polls')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw new Error('Failed to fetch polls');
  return data;
}

export async function getAllCodes(): Promise<VoteCode[]> {
  const { data, error } = await supabase
    .from('vote_codes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error("Supabase Error:", error.message, error.details);
    throw new Error('Failed to fetch codes');
  }
  return data as VoteCode[];
}

/**
 * Custom Code Generator
 * Logic: StarzCruise-abd78 format
 */
export async function generateFormattedCodes(
  pollId: string,
  prefix: string,
  count: number,
) {
  const codes = [];
  for (let i = 0; i < count; i++) {
    const suffix = Math.random().toString(36).substring(2, 7);
    codes.push({
      poll_id: pollId,
      code: `${prefix}${suffix}`,
      status: 'available',
    });
  }
  const { error } = await supabase.from('vote_codes').insert(codes);
  if (error) throw new Error(error.message);
}

// --- PRESERVED ADMIN HELPERS (Updated for Polls table) ---

export async function startVoting(pollId: string, start: string, end: string) {
  const { data, error } = await supabase
    .from('polls')
    .update({ is_active: true, start_date: start, end_date: end })
    .eq('id', pollId)
    .select();
  if (error) throw new Error('Failed to start voting');
  return data;
}

export async function endVoting(pollId: string) {
  const { data, error } = await supabase
    .from('polls')
    .update({ is_active: false })
    .eq('id', pollId)
    .select();
  if (error) throw new Error('Failed to end voting');
  return data;
}

export async function exportCodesAsCSV(pollId: string) {
  const { data, error } = await supabase
    .from('vote_codes')
    .select('code, status, used_at')
    .eq('poll_id', pollId);
  if (error) throw new Error('Failed to fetch codes');

  const header = 'code,status,used_at';
  const rows = data.map(
    (row: any) => `${row.code},${row.status},${row.used_at || ''}`,
  );
  return [header, ...rows].join('\n');
}

// --- PRESERVED FINGERPRINT & DEVICE HELPERS ---

export async function getDeviceVoteCount({
  fingerprint,
  pollId,
}: DeviceVotesCount) {
  const { count, error } = await supabase
    .from('votes')
    .select('*', { count: 'exact', head: true })
    .eq('device_fingerprint', fingerprint)
    .eq('poll_id', pollId);
  if (error) throw new Error('Failed to fetch device vote count');
  return count ?? 0;
}

// utils/supabase/db.ts

export const castVote = async (
  pollId: string,
  contestantId: string,
  codeValue: string,
) => {
  // 1. Use .ilike for case-insensitive matching
  const { data: codeData, error: codeError } = await supabase
    .from('vote_codes')
    .select('id, is_used, poll_id')
    .ilike('code', codeValue.trim()) // This matches StarzCruisezbnnr even if they type starzcruisezbnnr
    .single();

  // DEBUG: If it's still failing, check the console
  if (codeError) {
    console.error('Supabase Error:', codeError.message);
    throw new Error('Invalid voting code.');
  }

  if (codeData.is_used) {
    throw new Error('This code has already been used.');
  }

  // 2. Extra Safety: Ensure the code belongs to the current poll
  if (codeData.poll_id !== pollId) {
    throw new Error('This code is for a different contest.');
  }

  // 3. Proceed with the vote insert as before
  const fingerprint = window.navigator.userAgent;
  const { error: insertError } = await supabase.from('votes').insert({
    poll_id: pollId,
    contestant_id: contestantId,
    vote_code_id: codeData.id,
    device_fingerprint: fingerprint,
  });

  if (insertError) throw new Error(insertError.message);

  return { success: true };
};

const getFingerprint = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  // A quick way to get unique hardware info
  const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
  const renderer = gl?.getParameter(debugInfo?.UNMASKED_RENDERER_WEBGL || 0);
  return `${renderer}-${window.screen.width}x${window.screen.height}`;
};

// export async function getFingerprint(): Promise<string> {
//   const fp = await FingerprintJS.load();
//   const result = await fp.get();
//   return result.visitorId;
// }

// // utils/supabase/db.ts

// export const castVote = async (pollId: string, contestantId: string, codeValue: string) => {
//   // 1. Check if the code exists, belongs to this poll, and isn't used
//   const { data: codeData, error: codeError } = await supabase
//     .from('vote_codes')
//     .select('*')
//     .eq('code', codeValue)
//     .eq('poll_id', pollId)
//     .eq('is_used', false)
//     .single();

//   if (codeError || !codeData) {
//     throw new Error("Invalid or already used voting code.");
//   }

//   // 2. Mark code as used and link to the contestant (for auditing)
//   const { error: updateError } = await supabase
//     .from('vote_codes')
//     .update({
//       is_used: true,
//       used_at: new Date().toISOString(),
//       contestant_id: contestantId
//     })
//     .eq('id', codeData.id);

//   if (updateError) throw updateError;

//   // 3. Increment the girl's vote count
//   const { error: voteError } = await supabase.rpc('increment_vote', {
//     con_id: contestantId
//   });

//   if (voteError) throw voteError;

//   return { success: true };
// };
