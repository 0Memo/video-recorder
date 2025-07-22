"use client"
import Image from 'next/image';
import { getVideoById } from '../lib/actions/video';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { daysAgo } from '@/lib/utils';
import { ICONS } from '../constants';

const VideoDetailHeader = ({ title, createdAt, userImg, username, videoId, ownerId, visibility, thumbnailUrl, id }: VideoDetailHeaderProps) => {
    const finalUserImgSrc = userImg || "/assets/images/dummy.jpg";

    const router = useRouter()
    const [copied, setCopied] = useState(false)
    
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${ window.location.origin }/video/${ id }`)
        setCopied(true)
    }

    useEffect(() => {
        const changeChecked = setTimeout(() => {
            if (copied) setCopied(false)
        }, 2000)

        return () => clearTimeout(changeChecked)
    }, [ copied ])

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
                        <h2>{ username ?? 'Guest' }</h2>
                    </button>
                    <figcaption
                        className='flex items-center gap-1 text-gray-100 text-sm font-semibold'
                    >
                        <span
                            className='mt-1'
                        >
                            ・
                        </span>
                        <p>
                            { daysAgo(createdAt) }
                        </p>
                    </figcaption>
                </figure>
            </aside>
            <aside
                className='flex gap-4 items-center'
            >
                <button
                    onClick={ handleCopyLink }
                >
                    <Image
                        src={copied ? ICONS.checked : ICONS.link}
                        alt="copy link"
                        width={24}
                        height={24}
                    />
                </button>
            </aside>
        </header>
    );
};

export default VideoDetailHeader