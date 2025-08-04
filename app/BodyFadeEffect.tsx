"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function BodyFadeEffect() {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);

    useEffect(() => {
        if (prevPathname.current !== pathname) {
        const timeout = setTimeout(() => {
            document.body.classList.remove("fading");
        }, 100);

        prevPathname.current = pathname;

        return () => clearTimeout(timeout);
        } else {
            document.body.classList.remove("fading");
        }
    }, [pathname]);

    return null;
}