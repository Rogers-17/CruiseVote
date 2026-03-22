import { supabase } from "@/utils/supabase/client";

export async function generatePollCodes(pollId: string, prefix: string, count: number) {
  const codes = [];
  
  for (let i = 0; i < count; i++) {
    // Generates a random 5-character suffix like 'abd78'
    const suffix = Math.random().toString(36).substring(2, 7); 
    codes.push({
      poll_id: pollId,
      code: `${prefix}${suffix}`,
      status: 'available'
    });
  }

  const { data, error } = await supabase
    .from('vote_codes')
    .insert(codes);
    
  return { data, error };
}