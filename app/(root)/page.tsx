import { getAllVideos } from '../../lib/actions/video';
import Header from '../../components/Header'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState';

const Page = async ({ searchParams }: SearchParams) => {
  const { query, filter, page } = await searchParams

  const { videos, pagination } = await getAllVideos(query, filter, Number(page) || 1)

  return (
    <main
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8
      flex flex-col min-h-screen pt-12.5 pb-20 gap-9"
    >
      <Header
        title="All videos"
        subHeader="Public Library"
      />
        {videos?.length > 0 ?
          (
            <section
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            >
              { videos.map(({ video, user}) => (
                <VideoCard
                  key={video.id}
                  {...video}
                  thumbnail={ video.thumbnailUrl}
                  userImg={ user?.image || ''}
                  username={ user?.name || 'Guest'}
                />
              ))}
            </section>
          ): (
            <div>
              <EmptyState
                icon="/assets/icons/video.svg"
                title="No Videos Found"
                description="Try adjusting your search"
              />
            </div>
          )}
    </main>
  );
}

export default Page