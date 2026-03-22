'use client';

import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
export interface VideoWithProfile {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: string;
  views: number;
  created_at: string;
  profiles: {
    display_name: string;
    username: string;
    avatar_url: string | null;
  };
}

export function useVideos() {
  const [videos, setVideos] = useState<VideoWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);

        // 2. Perform a relational JOIN
        const { data, error: fetchError } = await supabase
          .from('videos')
          .select(
            `
            *,
            profiles (
              display_name,
              username,
              avatar_url
            )
          `,
          )
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        // We cast the data to our interface
        setVideos((data as unknown as VideoWithProfile[]) || []);
      } catch (err: any) {
        console.error('Fetch error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return { videos, loading, error };
}
