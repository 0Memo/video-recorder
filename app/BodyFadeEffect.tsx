"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function BodyFadeEffect() {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);
    const isInitialMount = useRef(true);


    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (prevPathname.current !== pathname) {
            document.body.classList.add("fading");

            const timeout = setTimeout(() => {
                document.body.classList.remove("fading");
            }, 100);

            prevPathname.current = pathname;

            return () => {
                clearTimeout(timeout);
                document.body.classList.remove("fading");
            };
        }
    }, [pathname]);

    useEffect(() => {
        return () => {
            document.body.classList.remove("fading");
        };
    }, []);

    return null;
}