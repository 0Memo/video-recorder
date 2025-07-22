import { redirect } from "next/navigation";
import { getAllVideosByUser } from '../../../../lib/actions/video'
import EmptyState from "../../../../components/EmptyState";
import VideoCard from "../../../../components/VideoCard";
import Header from "../../../../components/Header";

const Page = async ({ params, searchParams } : ParamsWithSearch) => {
    const { id } = await params;
    const { query, filter } = await searchParams;

    const { user, videos } = await getAllVideosByUser(id, query, filter);
    if (!user) redirect("/404");
    
    return (
        <main
            className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8
            flex flex-col min-h-screen pt-12.5 pb-20 gap-9"
        >
            <Header
                subHeader={ user?.email }
                title={ user?.name }
                userImg={ user?.image ?? '' }
            />

            {videos?.length > 0 ? (
                <section
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {videos.map(({ video }) => (
                        <VideoCard
                            key={video.id}
                            id={video.videoId}
                            title={video.title}
                            thumbnail={video.thumbnailUrl}
                            createdAt={video.createdAt}
                            userImg={user.image ?? ""}
                            username={user.name ?? "Guest"}
                            views={video.views}
                            visibility={video.visibility}
                            duration={video.duration}
                        />
                    ))}
                </section>
            ) : (
                <EmptyState
                    icon="/assets/icons/video.svg"
                    title="No Videos Available Yet"
                    description="Video will show up here once you upload them."
                />
            )}
        </main>
    )
}

export default Page