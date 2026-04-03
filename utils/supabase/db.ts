import {
  ContestantPayload,
  DeviceVotesCount,
  GetContestant,
  UpdateContestPayload,
  Votes,
} from '@/lib/type';
import { supabase } from './client';

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
  poll_id,
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
    console.error('Supabase Error:', error.message, error.details);
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

export const castVote = async (
  pollId: string,
  contestantId: string,
  codeValue: string,
) => {
  // Use .ilike for case-insensitive matching
  const { data: codeData, error: codeError } = await supabase
    .from('vote_codes')
    .select('id, is_used, poll_id')
    .ilike('code', codeValue.trim()) // This matches StarzCruisezbnnr even if they type starzcruisezbnnr
    .single();

  if (codeError) {
    console.error('Supabase Error:', codeError.message);
    throw new Error('Invalid voting code.');
  }

  if (codeData.is_used) {
    throw new Error('This code has already been used.');
  }

  if (codeData.poll_id !== pollId) {
    throw new Error('This code is for a different contest.');
  }

  // Proceed with the vote insert
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

// const getFingerprint = () => {
//   const canvas = document.createElement('canvas');
//   const gl = canvas.getContext('webgl');
//   // A quick way to get unique hardware info
//   const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
//   const renderer = gl?.getParameter(debugInfo?.UNMASKED_RENDERER_WEBGL || 0);
//   return `${renderer}-${window.screen.width}x${window.screen.height}`;
// };
