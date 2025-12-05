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

interface VideoDetailHeaderProps {
    title: string;
    description: string;
    createdAt: Date;
    userImg?: string | null;
    username?: string;
    videoId: string;
    ownerId: string;
    visibility: string;
    thumbnailUrl: string;
    id: string;
    downloadUrl?: string | null;
}

interface VideoDetailHeaderDictionaryProps extends VideoDetailHeaderProps {
    dictionary: Dictionary
}

const VideoDetailHeader = ({ title, description, createdAt, userImg, username, videoId, ownerId, visibility, thumbnailUrl, id, dictionary, downloadUrl }: VideoDetailHeaderDictionaryProps) => {
    const finalUserImgSrc = userImg || "/assets/images/dummy.jpg";

    const router = useRouter()
    const [copied, setCopied] = useState(false)
    const pathname = usePathname();
    const currentLocale = getLocaleFromPathname(pathname)
    const [downloaded, setDownloaded] = useState(false)
    
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${ window.location.origin }/video/${ id }`)
        setCopied(true)
        setDownloaded(false);
    }

    const handleProfileNavigation = () => {
        const profileUrl = addLocaleToPathname(
            `/profile/${ownerId}`,
            currentLocale
        );
        router.push(profileUrl);
    };

    const handleDownload = async () => {
        if (!downloadUrl) {
            alert("This video is not yet ready for download.");
            return;
        }

        try {
            const res = await fetch(downloadUrl, { method: "HEAD" });

            // If Bunny responds OK → use download URL
            let finalUrl = downloadUrl;
            if (!res.ok) {
            console.warn(
                `⚠️ Download URL not available (${res.status}), falling back.`
            );
            finalUrl = `https://iframe.mediadelivery.net/play/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}/${videoId}`;
            }

            const link = document.createElement("a");
            link.href = finalUrl;
            link.download = `${title}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setDownloaded(true);
        } catch (error) {
            console.error("❌ Error trying to download:", error);
            alert("Could not download the video right now.");
        } finally {
            setTimeout(() => setDownloaded(false), 2000);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (copied) setCopied(false);
            if (downloaded) setDownloaded(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [copied, downloaded]);

    const { theme, mounted } = useTheme();
    
    if (!mounted) return null;

    return (
        <header
            className='flex justify-between gap-5 flex-col md:flex-row relative'
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
                <span
                    className={`text-lg font-bold ${
                        theme === "dark" ? "text-white" : "text-[#1d073a]"
                    }`}
                >
                    { description }
                    </span>
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
                    className="absolute top-15 right-20 shadow-md hover:shadow-lg transition duration-200 bg-white rounded-full size-8 flex items-center justify-center"
                >
                    <Image
                        src={ copied ? ICONS.checked : ICONS.link }
                        alt="copy link"
                        width={24}
                        height={24}
                    />
                </button>
                { downloadUrl ? (
                    <button
                        onClick={ handleDownload }
                        className="absolute top-15 right-3 shadow-md hover:shadow-lg transition duration-200 bg-white rounded-full size-8 flex items-center justify-center"
                    >
                        <Image
                            src={ downloaded ? ICONS.checked : ICONS.download } alt="download"
                            width={24}
                            height={24}
                        />
                    </button>
                ) : (
                    <p className="absolute top-16 right-3 text-xs text-gray-400 italic">
                        Next...
                    </p>
                )}
            </aside>
        </header>
    );
};

export default VideoDetailHeader