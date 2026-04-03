import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const createClient = () => createBrowserClient(supabaseUrl!, supabaseKey!);

export const supabase = createClient();

const POLL_ID = '332155a0-1ce1-46a1-88f4-71fe7a7c0d57';
const CONTESTANT_ID = '6517c601-9eb6-4c62-a02a-6d253345674f';
const TOTAL_VOTES = 500;
const CONCURRENCY = 50;

const castVote = async (
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
  // const fingerprint = window.navigator.userAgent;
  const { error: insertError } = await supabase.from('votes').insert({
    poll_id: pollId,
    contestant_id: contestantId,
    vote_code_id: codeData.id,
    device_fingerprint: null,
  });

  if (insertError) throw new Error(insertError.message);

  return { success: true };
};

// async function castVoteNode(pollId: string, contestantId: string, codeValue: string) {
//   // 1. Check code
//   const { data: codeData, error: codeError } = await supabase
//     .from('vote_codes')
//     .select('id, is_used, poll_id')
//     .ilike('code', codeValue.trim())
//     .single();

//   if (codeError || !codeData) throw new Error(`Invalid code: ${codeValue}`);
//   if (codeData.is_used) throw new Error(`Used: ${codeValue}`);

//   // 2. Insert Vote
//   const { error: insertError } = await supabase.from('votes').insert({
//     poll_id: pollId,
//     contestant_id: contestantId,
//     vote_code_id: codeData.id,
//     device_fingerprint: 'TERMINAL_TEST_RUNNER',
//   });

//   if (insertError) throw new Error(insertError.message);

//   // 3. Mark code as used (Don't forget this part of your logic!)
//   await supabase.from('vote_codes').update({ is_used: true }).eq('id', codeData.id);

//   return { success: true };
// }

async function run() {
  console.log(`🚀 Terminal Stress Test: ${TOTAL_VOTES} votes starting...`);
  const start = Date.now();

  for (let i = 0; i < TOTAL_VOTES; i += CONCURRENCY) {
    const promises = Array.from({ length: CONCURRENCY }).map((_, index) => {
      const codeNumber = i + index + 1;
      return castVote(POLL_ID, CONTESTANT_ID, `TEST-CODE-${codeNumber}`).catch(
        (err) => ({ error: err.message }),
      );
    });

    await Promise.all(promises);
    console.log(`📡 Progress: ${i + CONCURRENCY}/${TOTAL_VOTES}`);
  }

  const duration = (Date.now() - start) / 1000;
  console.log(
    `🏁 Finished in ${duration}s. Avg: ${(duration / TOTAL_VOTES).toFixed(3)}s/vote`,
  );
}

run();
