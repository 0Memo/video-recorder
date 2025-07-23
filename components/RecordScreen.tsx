"use client"
import { useRef, useState } from "react"
import { ICONS } from "../constants"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useScreenRecording } from "../lib/hooks/useScreenRecording"
import LoadingOverlay from "./LoadingOverlay"

const RecordScreen = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isLoading, setIsLoading] = useState(false);

    const { isRecording,
        recordedBlob,
        recordedVideoUrl,
        recordingDuration,
        startRecording,
        stopRecording,
        resetRecording
    } = useScreenRecording()

    const closeModal = () => {
        resetRecording()
        setIsOpen(false)
    }

    const handleStart = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        await startRecording()
    }

    const handleStop = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        stopRecording()
    }

    const recordAgain = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        resetRecording()
        await startRecording()

        if (recordedVideoUrl && videoRef.current) {
            videoRef.current.src = recordedVideoUrl
        }
    }

    const goToUpload = () => {
        if (!recordedBlob) return;
        const url = URL.createObjectURL(recordedBlob);
        sessionStorage.setItem(
            "recordedVideo",
            JSON.stringify({
            url,
            name: "screen-recording.webm",
            type: recordedBlob.type,
            size: recordedBlob.size,
            duration: recordingDuration || 0, // Store the duration with the video data
            })
        );
        setIsLoading(true);
        router.push("/upload");
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        closeModal();
    };

    return (
        <>
            <div>
                <button
                    className="py-2.5 px-5 flex items-center gap-2.5 text-sm font-semibold text-white !bg-[#1d073a]"
                    style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', borderBottom: '4px solid #C3B1E1' }}
                    onClick={() => {
                        setIsLoading(true)
                        setIsOpen(true)
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500);
                    }}
                >
                    <Image
                        src={ ICONS.record }
                        alt="record"
                        width={24}
                        height={24}
                        style={{ filter: 'brightness(0) invert(1)' }} 
                    />
                    <span>
                        Record a video
                    </span>
                </button>
            
                { isOpen && (
                    <section
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div
                            className="absolute inset-0 bg-gray-40 backdrop-blur-xs shadow-20"
                            onClick={ closeModal }
                        />
                        <div className="relative bg-white rounded-20 p-6 shadow-lg w-full max-w-lg z-10 border border-[#1d073a]">
                            <figure
                                className="flex justify-between items-center mb-4"
                            >
                                <h3
                                    className="text-xl font-bold text-[#1d073a]"
                                >
                                    Screen Recording
                                </h3>
                                <button
                                    className="p-2 rounded-full hover:bg-[#C3B1E1]"
                                    onClick={ closeModal }
                                >
                                    <Image
                                        src={ ICONS.close }
                                        alt="close"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </figure>
            
                            <section
                                className="w-full rounded-18 flex items-center justify-center overflow-hidden"
                            >
                                { isRecording ? 
                                    (
                                        <article
                                            className="flex flex-col items-center gap-2"
                                        >
                                            <div
                                                className="w-4 h-4 bg-red-500 rounded-full animate-pulse"
                                            />
                                            <span
                                                className="text-dark-100 text-base font-medium"
                                            >
                                                Recording in progress...
                                            </span>
                                        </article>
                                    ) : recordedVideoUrl ? (
                                        <video
                                            ref={ videoRef }
                                            src={ recordedVideoUrl }
                                            controls
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <p
                                            className="text-base font-medium text-gray-100"
                                        >
                                            Click record to start capturing your screen
                                        </p>
                                    )
                                }
                            </section>
            
                            <div
                                className="flex justify-center gap-4 mt-4"
                            >
                                {
                                    !isRecording && !recordedVideoUrl && (
                                        <button
                                            className="py-2.5 px-6 bg-[#1d073a] text-white font-medium flex items-center gap-2
                                            rounded-[255px_15px_225px_15px/15px_225px_15px_255px]
                                            border-b-4 border-b-[#C3B1E1]"
                                            onClick={ handleStart }
                                        >
                                            <Image
                                                src={ ICONS.record }
                                                alt="record"
                                                width={22}
                                                height={22}
                                                className="brightness-0 invert -mt-1"
                                            />
                                            Record
                                        </button>
                                    )
                                }
            
                                {
                                    isRecording && (
                                        <button
                                            className="py-2.5 px-6 bg-red-500 text-white font-medium flex items-center gap-2
                                            rounded-[255px_15px_225px_15px/15px_225px_15px_255px]
                                            border-b-4 border-b-[#C3B1E1]"
                                            onClick={ handleStop }
                                        >
                                            <Image
                                                src={ ICONS.record }
                                                alt="record"
                                                width={22}
                                                height={22}
                                                className="brightness-0 invert -mt-1"
                                            />
                                            Stop recording
                                        </button>
                                    )
                                }
            
                                {
                                    recordedVideoUrl && (
                                        <>
                                            <button
                                                className="py-2.5 px-6 bg-gray-100 text-white font-medium
                                                rounded-[255px_15px_225px_15px/15px_225px_15px_255px]
                                                border-b-4 border-b-[#C3B1E1]"
                                                onClick={ recordAgain }
                                            >
                                                Record Again
                                            </button>
                                            <button
                                                className="py-2.5 px-6 bg-[#1d073a] text-white font-medium flex items-center gap-2
                                                rounded-[255px_15px_225px_15px/15px_225px_15px_255px]
                                                border-b-4 border-b-[#C3B1E1]"
                                                onClick={ goToUpload }
                                            >
                                                <Image
                                                    src={ ICONS.upload }
                                                    alt="upload"
                                                    width={16}
                                                    height={16}
                                                    className="brightness-0 invert"
                                                />
                                                Continue to Upload
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </section>
                ) }
            </div>
            {isLoading && <LoadingOverlay color="#1d073a" />}{" "}
        </>
    )
}

export default RecordScreen