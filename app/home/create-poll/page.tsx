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
    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    const { data, error } = await supabase
      .from('polls')
      .insert([
        {
          title,
          slug,
          description,
          start_date,
          end_date,
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);

    // Redirect to the newly created poll's dashboard
    redirect(`home/polls/${data.slug}`);
  }

  return (
    <div className="rounded-xl p-4 md:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">Create New Voting Poll</h1>

      <form action={createPoll} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Poll Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="e.g. Face of Starz Cruise 2026"
            required
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Description
          </label>
          <textarea
            name="description"
            placeholder="e.g. This poll was created to see who owns Starz"
            required
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Start Date
            </label>
            <input
              name="start_date"
              type="datetime-local"
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              End Date
            </label>
            <input
              name="end_date"
              type="datetime-local"
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-brand-yellow hover:bg-brand-yellow-primary w-full rounded-lg py-3 font-bold text-black shadow-md transition"
        >
          Create Poll
        </button>
      </form>
    </div>
  );
}
