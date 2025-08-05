"use client"
import Image from 'next/image';
import { getVideoById } from '../lib/actions/video';
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import { ICONS } from '../constants';
import { getLocaleFromPathname, addLocaleToPathname } from "../lib/i18n/utils";
import type { Dictionary } from "../lib/i18n/dictionaries";
import { daysAgo } from "../lib/utils";
import { useTheme } from "../lib/hooks/useTheme";

interface VideoDetailHeaderDictionaryProps extends VideoDetailHeaderProps {
    dictionary: Dictionary
}

const VideoDetailHeader = ({ title, createdAt, userImg, username, videoId, ownerId, visibility, thumbnailUrl, id, dictionary }: VideoDetailHeaderDictionaryProps) => {
    const finalUserImgSrc = userImg || "/assets/images/dummy.jpg";

    const router = useRouter()
    const [copied, setCopied] = useState(false)
    const pathname = usePathname();
    const currentLocale = getLocaleFromPathname(pathname);
    
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${ window.location.origin }/video/${ id }`)
        setCopied(true)
    }

    const handleProfileNavigation = () => {
        const profileUrl = addLocaleToPathname(
            `/profile/${ownerId}`,
            currentLocale
        );
        router.push(profileUrl);
    };

    useEffect(() => {
        const changeChecked = setTimeout(() => {
            if (copied) setCopied(false)
        }, 2000)

        return () => clearTimeout(changeChecked)
    }, [ copied ])

    const { theme, mounted } = useTheme();
    
    if (!mounted) return null;

    return (
        <header
            className='flex justify-between gap-5 flex-col md:flex-row'
        >
            <aside
                className='flex flex-col gap-2.5'
            >
                <h1
                    className={`text-3xl font-bold ${
                            theme === "dark" ? "text-white" : "text-[#1d073a]"
                        }`}
                >
                    {title}
                </h1>
                <figure
                    className='gap-1 flex items-center'
                >
                    <button
                        className='flex items-center gap-2 text-gray-100 text-sm font-semibold'
                        onClick={ handleProfileNavigation }
                    >
                        <Image
                            src={finalUserImgSrc || "/placeholder.svg"}
                            alt="User"
                            width={24}
                            height={24}
                            className='rounded-full'
                        />
                        <h2
                            className={`${
                            theme === "dark" ? "text-white" : "text-[#1d073a]"
                        }`}
                        >
                            { username ?? 'Guest' }
                        </h2>
                    </button>
                    <figcaption
                        className={`flex items-center gap-1 text-sm font-semibold ${
                            theme === "dark" ? "text-white" : "text-gray-100"
                        }`}
                    >
                        <span
                            className='mt-1'
                        >
                            ・
                        </span>
                        <p>
                            {daysAgo(createdAt, dictionary)}
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
                        src={ copied ? ICONS.checked : ICONS.link }
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