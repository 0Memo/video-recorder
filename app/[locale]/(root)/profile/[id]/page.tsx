import { redirect } from "next/navigation";
import { getAllVideosByUser } from '../../../../../lib/actions/video'
import EmptyState from "../../../../../components/EmptyState";
import VideoCard from "../../../../../components/VideoCard";
import Header from "../../../../../components/Header";
import { getDictionary } from "../../../../../lib/i18n/dictionaries";
import type { Locale } from "../../../../../lib/i18n/config";
import { ICONS } from "../../../../../constants"

interface PageProps {
    params: Promise<{
        locale: Locale;
        id: string;
    }>;
    searchParams: Promise<{
        query?: string;
        filter?: string;
    }>;
}

const Page = async ({ params, searchParams } : PageProps) => {
    const { locale, id } = await params;
    const { query, filter } = await searchParams;
    const dictionary = await getDictionary(locale);

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
                dictionary={ dictionary }
            />

            {videos?.length > 0 ? (
                <section
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {videos.map(({ video }) => (
                        <VideoCard
                            key={video.id}
                            videoId={video.videoId}
                            id={video.id}
                            title={video.title}
                            thumbnail={video.thumbnailUrl}
                            createdAt={video.createdAt}
                            userImg={user.image ?? ""}
                            username={user.name ?? "Guest"}
                            views={video.views}
                            visibility={video.visibility}
                            duration={video.duration}
                            dictionary={ dictionary }
                        />
                    ))}
                </section>
            ) : (
                <EmptyState
                    icon={ ICONS.video }
                    title="No Videos Available Yet"
                    description="Video will show up here once you upload them."
                />
            )}
        </main>
    )
}

export default Page