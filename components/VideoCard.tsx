"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    // Format the date safely
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(createdAt);

    return (
        <Link
        href={`/video/${id}`}
        className="relative block max-w-90 rounded-2xl shadow-md overflow-hidden bg-white"
        >
            <div className="relative w-auto h-[210px] rounded-sm overflow-hidden">
                <Image
                src={thumbnail}
                alt="thumbnail"
                fill
                sizes="(max-width: 768px) 100vw, 290px"
                className="object-cover rounded-xl"
                priority={true}
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-600 mb-2">By {username}</p>
                <div className="flex items-center text-xs text-gray-500">
                <span>{formattedDate}</span>
                <span className="mx-1">&bull;</span>
                <span>{views} views</span>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;