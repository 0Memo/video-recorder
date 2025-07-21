import { createIframeLink } from '@/lib/utils'
import React from 'react'

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
    return (
        <div
            className='relative aspect-video w-full rounded-2xl bg-[#000] flex-none'
        >

            <iframe
                src={ createIframeLink((videoId)) }
                className='absolute inset-0 h-full w-full rounded-2xl'
                loading='lazy'
                title="Video Player"
                style={{ border: 0, zIndex: 50 }}
                allowFullScreen
                allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
            />
        </div>
    )
}

export default VideoPlayer