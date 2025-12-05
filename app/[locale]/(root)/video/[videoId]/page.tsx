import { redirect } from 'next/navigation'
import { getVideoById } from '../../../../../lib/actions/video'
import React from 'react'
import VideoPlayer from '../../../../../components/VideoPlayer'
import VideoDetailHeader from '../../../../../components/VideoDetailHeader'
import { getDictionary } from "../../../../../lib/i18n/dictionaries";
import type { Locale } from "../../../../../lib/i18n/config";

interface VideoPageProps {
    params: Promise<{
        locale: Locale;
        videoId: string;
    }>
}

const page = async ({ params }: VideoPageProps) => {
    const { locale, videoId } = await params
    const dictionary = await getDictionary(locale);

    const data = await getVideoById(videoId);

    if (!data || !data.video) {
        redirect("/404");
    }

    const { user, video } = data;

    return (
        <main
            className='max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8
            flex flex-col min-h-screen pt-12.5 pb-20 gap-9'
        >
            <VideoDetailHeader
                { ...video }
                userImg={ user?.image}
                username={ user?.name || "Guest"}
                ownerId={ video.userId}
                dictionary={ dictionary }
                downloadUrl={ video.downloadUrl ?? undefined }
            />
            <section
                className='flex flex-col lg:flex-row gap-7.5'
            >
                <div
                    className='flex flex-col gap-6 w-full'
                >
                    <VideoPlayer
                        videoId={ video.videoId }
                    />
                </div>
            </section>
            
        </main>
    )
}

export default page