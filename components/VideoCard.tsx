"use client"

import type React from "react"

import Image from "next/image"
import { startTransition, useEffect, useState, useRef } from "react"
import LoadingOverlay from "./LoadingOverlay"
import { useRouter, usePathname } from "next/navigation"
import { ICONS } from "../constants"
import ConfirmModal from "./ConfirmModal"
import { deleteVideo } from "../lib/actions/video"
import type { Dictionary } from "../lib/i18n/dictionaries"
import { getLocaleFromPathname, addLocaleToPathname } from "../lib/i18n/utils"
import { daysAgo } from "../lib/utils"

interface VideoCardProps {
    videoId: string
    title: string
    thumbnail: string
    userImg: string
    username: string
    createdAt: Date
    views: number
    visibility: string
    duration: number | null | undefined
    dictionary: Dictionary
    userId?: string
    id: string
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
    userId,
    videoId,
}: VideoCardProps) => {
    const [showModal, setShowModal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const currentLocale = getLocaleFromPathname(pathname)
    const [isLoading, setIsLoading] = useState(false)
    const finalUserImgSrc = userImg || "/assets/images/dummy.jpg"
    const [copied, setCopied] = useState(false)

    // Hover effect refs and state
    const cardRef = useRef<HTMLDivElement>(null)
    const lettersRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [randomText, setRandomText] = useState("")

    // Random character generation
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))]
    const randomString = (length: number) => Array.from(Array(length)).map(randomChar).join("")

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/video/${id}`)
        setCopied(true)
    }

    const handleVideoNavigation = () => {
        setIsLoading(true)
        const videoUrl = addLocaleToPathname(`/video/${id}`, currentLocale)
        router.push(videoUrl)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    const handleProfileNavigation = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!userId) return
        setIsLoading(true)
        const profileUrl = addLocaleToPathname(`/profile/${userId}`, currentLocale)
        router.push(profileUrl)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    // Handle mouse movement for hover effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !lettersRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setMousePosition({ x, y })
        setRandomText(randomString(800))

        // Update CSS custom properties
        lettersRef.current.style.setProperty("--x", `${x}px`)
        lettersRef.current.style.setProperty("--y", `${y}px`)
    }

    const handleMouseEnter = () => {
        setRandomText(randomString(800))
    }

    useEffect(() => {
        const changeChecked = setTimeout(() => {
            if (copied) setCopied(false)
        }, 2000)

        return () => clearTimeout(changeChecked)
    }, [copied])

    const handleDelete = () => {
        setIsDeleting(true)
        startTransition(async () => {
            try {
                await deleteVideo(id, thumbnail)
                setShowModal(false)
                const homeUrl = addLocaleToPathname("/", currentLocale)
                router.push(homeUrl)
            } catch (err) {
                console.error(err)
                alert("Failed to delete video.")
            } finally {
                setIsDeleting(false)
            }
        })
    }

    return (
        <>
            <div className="card-wrapper relative">
                <div
                    ref={cardRef}
                    onClick={handleVideoNavigation}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    className="card relative block max-w-90 rounded-2xl overflow-hidden bg-white cursor-pointer shadow-md shadow-[#1d073a] group"
                    style={{
                        background: `linear-gradient(135deg, 
                        rgba(29, 7, 58, 0.1) 0%, 
                        rgba(195, 177, 225, 0.1) 50%, 
                        rgba(29, 7, 58, 0.1) 100%)`,
                    }}
                >
                {/* Card Image */}
                <div className="card-image relative w-auto h-[250px] rounded-sm overflow-hidden">
                    <Image
                        src={thumbnail || "/placeholder.svg"}
                        alt="thumbnail"
                        fill
                        sizes="(max-width: 768px) 100vw, 290px"
                        className="object-cover rounded-xl"
                        priority={true}
                    />
                </div>

                {/* Card Gradient Overlay */}
                <div
                    className="card-gradient absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-400 pointer-events-none z-10"
                    style={{
                    background: `radial-gradient(
                        circle at ${mousePosition.x}px ${mousePosition.y}px,
                        rgba(29, 7, 58, 0.8) 0%,
                        rgba(195, 177, 225, 0.6) 30%,
                        rgba(29, 7, 58, 0.4) 60%,
                        transparent 80%
                    )`,
                    mixBlendMode: "multiply",
                    }}
                />

                {/* Card Letters Effect */}
                <div
                    ref={lettersRef}
                    className="card-letters absolute inset-0 text-white text-xs font-medium break-words opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-20"
                    style={{
                    WebkitMaskImage: `radial-gradient(
                        200px circle at var(--x, 0px) var(--y, 0px),
                        rgb(255 255 255) 20%,
                        rgb(255 255 255 / 25%) 40%,
                        transparent 70%
                    )`,
                    maskImage: `radial-gradient(
                        200px circle at var(--x, 0px) var(--y, 0px),
                        rgb(255 255 255) 20%,
                        rgb(255 255 255 / 25%) 40%,
                        transparent 70%
                    )`,
                    transform: "scale(1.02)",
                    wordWrap: "break-word",
                    lineHeight: "1.2",
                    padding: "8px",
                    }}
                >
                    {randomText}
                </div>

                {/* Card Content */}
                <article className="relative z-30 flex flex-col gap-3 px-3.5 pt-4 pb-4.5 rounded-b-2xl bg-white/90 backdrop-blur-sm">
                    <div className="flex gap-2 justify-between">
                    <figure className="flex items-center gap-1.5">
                        <button
                            onClick={handleProfileNavigation}
                            className="flex-shrink-0 hover:opacity-80 transition-opacity"
                            title={`${dictionary.navbar.profile} - ${username}`}
                        >
                        <Image
                            src={finalUserImgSrc || "/placeholder.svg"}
                            alt="avatar"
                            width={34}
                            height={34}
                            className="rounded-full aspect-square p-1 ring-1 ring-[#2F2776]"
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
                                <h3 className="text-xs font-semibold text-[#1d073a]">
                                    {username}
                                </h3>
                            </button>
                            <p
                                className="text-xs text-gray-100 font-normal capitalize"
                            >
                                { visibility }
                            </p>
                        </figcaption>
                    </figure>
                    <aside className="flex items-center gap-1">
                        <Image
                            src={ICONS.eye || "/placeholder.svg"}
                            alt="views"
                            width={16}
                            height={16}
                            style={{
                                filter:
                                "brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%) hue-rotate(229deg) brightness(92%) contrast(101%)",
                            }}
                        />
                        <span className="text-xs text-[#1d073a] font-normal">{views}</span>
                    </aside>
                    </div>
                    <h2 className="text-base font-semibold truncate">
                    <span className="text-[#1d073a]">{title}</span> -{" "}
                    <span className="text-sm font-extralight">{daysAgo(createdAt, dictionary)}</span>
                    </h2>
                </article>

                {/* Action Buttons */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleCopyLink()
                    }}
                    className="absolute top-5 left-3 shadow-md hover:shadow-lg transition duration-200 bg-white rounded-full size-8 flex items-center justify-center"
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
                    className="absolute top-5 right-3 shadow-md hover:shadow-lg transition duration-200 bg-white/90 backdrop-blur-sm rounded-full size-8 flex items-center justify-center z-40"
                    title={dictionary.common.delete}
                >
                    <Image src={ICONS.garbage || "/placeholder.svg"} alt="delete" width={18} height={18} />
                </button>

                {/* Duration Badge */}
                {duration && (
                    <div
                        className="absolute top-50 right-2 font-medium text-white text-xs px-2.5 py-1 bg-[#1d073a]/90 backdrop-blur-sm flex flex-col items-center justify-center z-40"
                        style={{ borderRadius: "59% 41% 56% 44% / 58% 52% 48% 42%" }}
                        >
                        {Math.ceil(duration / 60)}min
                    </div>
                )}

                {/* Card Corners */}
                <div className="card-corners absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <span className="card-corner absolute w-1 h-2 bg-white -top-1 -left-1 after:content-[''] after:absolute after:w-2 after:h-1 after:bg-white after:-left-1 after:top-1"></span>
                    <span className="card-corner absolute w-1 h-2 bg-white -top-1 -right-1 after:content-[''] after:absolute after:w-2 after:h-1 after:bg-white after:-right-1 after:top-1"></span>
                    <span className="card-corner absolute w-1 h-2 bg-white -bottom-1 -right-1 after:content-[''] after:absolute after:w-2 after:h-1 after:bg-white after:-right-1 after:-top-1"></span>
                    <span className="card-corner absolute w-1 h-2 bg-white -bottom-1 -left-1 after:content-[''] after:absolute after:w-2 after:h-1 after:bg-white after:-left-1 after:-top-1"></span>
                </div>
                </div>
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
    )
}

export default VideoCard