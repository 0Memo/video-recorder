"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "../lib/hooks/useTheme";
import { cn } from "../lib/utils"

const ImageWithFallback = ({
    fallback = "/assets/images/dummy.jpg",
    alt,
    src,
    ...props
    }: ImageWithFallbackProps) => {
    const [error, setError] = useState<boolean | null>(null);
    const [imgSrc, setImgSrc] = useState<string>(src || fallback);
    const { theme } = useTheme();

    useEffect(() => {
        setError(null);
        setImgSrc(src || fallback);
    }, [src, fallback]);

    return (
        <Image
            alt={alt}
            onError={() => setError(true)}
            src={error ? fallback : imgSrc}
            {...props}
            className={cn("rounded-full aspect-square p-1 ring-2",
                theme === "dark"
                    ? "ring-white"
                    : "ring-[#2F2776]"
            )}
        />
    );
};

export default ImageWithFallback;