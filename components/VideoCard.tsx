"use client";

import Image from "next/image";
import { startTransition, useEffect, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { useRouter, usePathname } from "next/navigation";
import { ICONS } from "../constants"
import ConfirmModal from "./ConfirmModal";
import { deleteVideo } from "../lib/actions/video";
import type { Dictionary } from "../lib/i18n/dictionaries";
import { getLocaleFromPathname, addLocaleToPathname } from "../lib/i18n/utils";
import { daysAgo } from "../lib/utils";

interface VideoDictionaryProps extends VideoCardProps {
    dictionary: Dictionary;
    userId?: string
}

const VideoCard = ({
    id,
    title,
    thumbnail,
    userImg,
    username,
    createdAt,
    views,
    visibility,
    duration,
    dictionary,
    userId
}: VideoDictionaryProps) => {
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = getLocaleFromPathname(pathname);
    const [isLoading, setIsLoading] = useState(false);
    const finalUserImgSrc = userImg || "/assets/images/dummy.jpg";
    const [copied, setCopied] = useState(false)
    const [formattedDate, setFormattedDate] = useState("");
        
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${ window.location.origin }/video/${ id }`)
        setCopied(true)
    }

    const handleVideoNavigation = () => {
        setIsLoading(true);
        const videoUrl = addLocaleToPathname(`/video/${id}`, currentLocale);
        router.push(videoUrl);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleProfileNavigation = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the video navigation
        if (!userId) return;
        setIsLoading(true);
        const profileUrl = addLocaleToPathname(
            `/profile/${userId}`,
            currentLocale
        );
        router.push(profileUrl);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    useEffect(() => {
        const changeChecked = setTimeout(() => {
            if (copied) setCopied(false)
        }, 2000)

        return () => clearTimeout(changeChecked)
    }, [ copied ])

    useEffect(() => {
        const date = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(createdAt));
        setFormattedDate(date);
    }, [createdAt]);


    const handleDelete = () => {
        setIsDeleting(true);
        startTransition(async () => {
            try {
                await deleteVideo(id, thumbnail);
                setShowModal(false);
                router.push('/');
            } catch (err) {
                console.error(err);
                alert("Failed to delete video.");
            } finally {
                setIsDeleting(false);
            }
        });
    };

    return (
        <>
            <div
                onClick={ handleVideoNavigation } 
                className="relative block max-w-90 rounded-2xl shadow-md overflow-hidden bg-white cursor-pointer"
            >
                <div
                    className="relative w-auto h-[210px] rounded-sm overflow-hidden"
                >
                    <Image
                        src={thumbnail || "/placeholder.svg"}
                        alt="thumbnail"
                        fill
                        sizes="(max-width: 768px) 100vw, 290px"
                        className="object-cover rounded-xl"
                        priority={true}
                    />
                </div>
            
                <article
                    className="flex flex-col gap-3 px-3.5 pt-4 pb-4.5 rounded-b-2xl"
                >
                    <div
                        className="flex gap-2 justify-between"
                    >
                        <figure
                            className="flex items-center gap-1.5"
                        >
                            <button
                                onClick={ handleProfileNavigation }
                                className="flex-shrink-0 hover:opacity-80 transition-opacity"
                                title={`${dictionary.navbar.profile} - ${username}`}
                            >
                                <Image
                                    src={finalUserImgSrc || "/placeholder.svg"}
                                    alt="avatar"
                                    width={34}
                                    height={34}
                                    className="rounded-full aspect-square"
                                />
                            </button>
                            <figcaption
                                className="flex flex-col gap-0.5"
                            >
                                <button
                                    onClick={handleProfileNavigation}
                                    className="text-left hover:underline transition-all"
                                    title={`${dictionary.navbar.profile} - ${username}`}
                                >
                                    <h3
                                        className="text-xs font-semibold text-[#1d073a]"
                                    >
                                        { username }
                                    </h3>
                                </button>
                                <p
                                    className="text-xs text-gray-100 font-normal capitalize"
                                >
                                    { visibility }
                                </p>
                            </figcaption>
                        </figure>
                        <aside
                            className="flex items-center gap-1"
                        >
                            <Image
                                src={ ICONS.eye }
                                alt="views"
                                width={16}
                                height={16}
                                style={{ 
                                    filter: 'brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%)    hue-rotate(229deg) brightness(92%) contrast(101%)'
                                }}
                            />
                            <span
                                className="text-xs text-[#1d073a] font-normal"
                            >
                                { views }
                            </span>
                        </aside>
                    </div>
                    <h2
                        className="text-bas font-semibold truncate"
                    >
                        <span className="text-[#1d073a]">{ title }</span> - {" "} 
                        <span className="text-sm font-extralight capitalize">{daysAgo(createdAt, dictionary)}</span>
                    </h2>
                </article>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleCopyLink()
                    }}
                    className="absolute top-3 left-3 shadow-md hover:shadow-lg transition duration-200 bg-white rounded-full size-8 flex items-center justify-center"
                >
                    <Image
                        src={ copied ? ICONS.checked : ICONS.link }
                        alt="copy"
                        width={18}
                        height={18}
                    />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setShowModal(true)
                    }}
                    className="absolute top-3 right-3 shadow-md hover:shadow-lg transition duration-200 bg-white rounded-full size-8 flex items-center justify-center"
                >
                    <Image
                        src={ ICONS.garbage }
                        alt="delete"
                        width={18}
                        height={18}
                    />
                </button>
                {duration && (
                    <div
                        className="absolute top-40 right-2 font-medium text-white text-xs px-2.5 py-1 bg-[#1d073a] flex flex-col items-center justify-center p-3"
                        style={{ borderRadius: '59% 41% 56% 44% / 58% 52% 48% 42%' }}
                    >
                        {Math.ceil(duration / 60)}min
                    </div>
                )}
            </div>
            {showModal && (
                <ConfirmModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    title={ dictionary.delete.title }
                    message={ dictionary.delete.sure }
                    dictionary={ dictionary }
                />
            )}
            {isLoading && <LoadingOverlay color="#1d073a" />}{" "}
        </>
    );
};

export default VideoCard;