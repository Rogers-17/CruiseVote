import { supabase } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export default function CreatePollPage() {
  async function createPoll(formData: FormData) {
    'use server';
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const start_date = formData.get('start_date') as string;
    const end_date = formData.get('end_date') as string;
    
    // Automatically generate a slug: "Face of Starz" -> "face-of-starz"
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const { data, error } = await supabase
      .from('polls')
      .insert([{ 
        title, 
        slug, 
        description, 
        start_date, 
        end_date, 
        is_active: true 
      }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    
    // Redirect to the newly created poll's dashboard
    redirect(`home/polls/${data.slug}`);
  }

  return (
    <div className="p-8 shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-gray-200 mb-6">Create New Voting Poll</h1>
      
      <form action={createPoll} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">Poll Title</label>
          <input name="title" type="text" placeholder="e.g. Face of Starz Cruise 2026" required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Description</label>
          <textarea name="description" placeholder="e.g. This poll was created to see who owns Starz" required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Start Date</label>
            <input name="start_date" type="datetime-local" required className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">End Date</label>
            <input name="end_date" type="datetime-local" required className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        </div>

        <button type="submit" className="w-full bg-brand-yellow text-black font-bold py-3 rounded-lg hover:bg-brand-yellow-primary transition shadow-md">
          Create Poll
        </button>
      </form>
    </div>
  );
}