'use client';

// import { Spinner } from '@/components/ui/spinner';
// import { useVideos } from '@/hooks/useVideos';
// import VideoCard from '@/components/layout/VideoCard';
// import Link from 'next/link';
// import Loader from '@/components/layout/Loader';

export default function HomeLayout() {
  // const { videos, loading, error } = useVideos();

  // if (error) {
  //   return <div>Error loading videos: {error}</div>;
  // }

  return (
    <section>
      {/* <div className="mb-8 text-2xl font-medium">
        <span>✨</span> Recommended for you
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {videos.map((video) => (
            <Link key={video.id} href={`/home/video-details/${video.id}`}>
              <VideoCard video={video} />
            </Link>
          ))}
        </div>
      )} */}

      Welcome to CruiseVote
    </section>
  );
}
