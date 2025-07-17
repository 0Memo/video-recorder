"use client";

import Image from "next/image";
import Link from "next/link";

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
            <div
                className="relative w-auto h-[210px] rounded-sm overflow-hidden"
            >
                <Image
                    src={thumbnail}
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
                            src={userImg}
                            alt="avatar"
                            width={34}
                            height={34}
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
                            className="text-xs text-gray-100 font-normal"
                        >
                            { views }
                        </span>
                    </aside>
                </div>
                <h2
                    className="text-base text-dark-100 font-semibold truncate"
                >
                    { title } - {" "} 
                    <span className="text-sm text-gray-100 font-normal capitalize">
                        { formattedDate }
                    </span>
                </h2>
            </article>
            <button
                onClick={() => {}}
                className="copy-btn"
            >
                <Image
                    src="/assets/icons/link.svg"
                    alt="copy"
                    width={18}
                    height={18}
                />
            </button>
            {duration && (
                <div className="duration">
                    {Math.ceil(duration / 60)}min
                </div>
            )}
        </Link>
    );
};

export default VideoCard;