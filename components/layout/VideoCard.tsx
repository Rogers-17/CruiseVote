'use client';

import Image from 'next/image';
import { formatRelativeDate, formatViews } from '@/utils/utils';
import { VideoWithProfile } from '@/hooks/useVideos';

// Using the type you already have in your project
interface VideoCardProps {
  video: VideoWithProfile;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="cursor-pointer space-y-3">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-800">
        <Image
          src={video.thumbnail_url}
          alt={video.title}
          fill
          priority
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute right-2 bottom-2 rounded-3xl bg-black/80 p-1 text-xs text-white">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex space-x-3">
        {video.profiles.avatar_url ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white">
            <img
              src={video.profiles.avatar_url}
              alt="Avatar"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white">
            {video.profiles.display_name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <div className="text-md mb-1 line-clamp-2 leading-tight font-medium transition hover:text-purple-400">
            {video.description}
          </div>
          <div className="text-sm font-medium text-gray-400">
            {video.profiles.display_name || video.profiles.username}
          </div>
          <div className="text-xs font-light text-gray-400">
            {formatViews(video.views)} views •{' '}
            <span> {formatRelativeDate(video.created_at)} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
