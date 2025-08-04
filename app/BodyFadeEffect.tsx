"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function BodyFadeEffect() {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);

    useEffect(() => {
        if (prevPathname.current !== pathname) {
        // Path changed — fade-in after content "should be" loaded
        const timeout = setTimeout(() => {
            document.body.classList.remove("fading");
        }, 300); // tweak duration for your fade

        prevPathname.current = pathname;

        return () => clearTimeout(timeout);
        } else {
        // On first mount (no path change), just remove fading immediately
        document.body.classList.remove("fading");
        }
    }, [pathname]);

    return null;
}