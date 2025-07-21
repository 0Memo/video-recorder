"use client"
import Image from 'next/image';
import { getVideoById } from '../lib/actions/video';
import React from 'react'
import { useRouter } from 'next/navigation';

const VideoDetailHeader = ({ title, createdAt, userImg, username, videoId, ownerId, visibility, thumbnailUrl }: VideoDetailHeaderProps) => {
    const finalUserImgSrc = userImg || "/assets/images/dummy.jpg";

    const router = useRouter()

    return (
        <header
            className='flex justify-between gap-5 flex-col md:flex-row'
        >
            <aside
                className='flex flex-col gap-2.5'
            >
                <h1
                    className='text-3xl font-bold text-[#1d073a]'
                >
                    {title}
                </h1>
                <figure
                    className='gap-1 flex items-center'
                >
                    <button
                        className='flex items-center gap-2 text-gray-100 text-sm font-semibold'
                        onClick={() => router.push(`/profile/${ ownerId }`)}
                    >
                        <Image
                            src={finalUserImgSrc || "/placeholder.svg"}
                            alt="User"
                            width={24}
                            height={24}
                            className='rounded-full'
                        />
                    </button>
                </figure>
            </aside>
        </header>
    );
};

export default VideoDetailHeader