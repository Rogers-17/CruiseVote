import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// console.log(supabaseKey, supabaseUrl);

export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!);

const supabase = createClient();

async function ping() {
  const { data, error } = await supabase.from('contestants').select('id').limit(1);
  if (error) {
    console.error('Ping failed:', error);
    process.exit(1);
  }
  console.log('Ping successful: Database is awake.');
}

ping();