"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { useRouter } from "next/navigation";

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
}: VideoCardProps) => {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const date = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(createdAt));
        setFormattedDate(date);
    }, [createdAt]);

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const finalUserImgSrc = userImg || "/assets/images/dummy.jpg";

    return (
        <>
            <div
                onClick={() => {
                    setIsLoading(true);
                    router.push(`/video/${id}`);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                }} 
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
                            <Image
                                src={finalUserImgSrc || "/placeholder.svg"}
                                alt="avatar"
                                width={34}
                                height={34}
                                className="rounded-full aspect-square"
                            />
                            <figcaption
                                className="flex flex-col gap-0.5"
                            >
                                <h3
                                    className="text-xs font-semibold text-[#1d073a]"
                                >
                                    { username }
                                </h3>
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
                                src="/assets/icons/eye.svg"
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
                        <span className="text-sm font-extralight capitalize">
                            { formattedDate }
                        </span>
                    </h2>
                </article>
                <button
                    onClick={() => {}}
                    className="absolute top-3 right-3 shadow-md hover:shadow-lg transition duration-200 bg-white rounded-full size-6 flex items-center justify-center"
                >
                    <Image
                        src="/assets/icons/link.svg"
                        alt="copy"
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
            {isLoading && <LoadingOverlay color="#1d073a" />}{" "}
        </>
    );
};

export default VideoCard;