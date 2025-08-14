"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocaleFromPathname } from "../lib/i18n/utils";
import { getDictionary } from "../lib/i18n/dictionaries";
import type { Dictionary } from "../lib/i18n/dictionaries";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
    const pathname = usePathname();
    const [dictionary, setDictionary] = useState<Dictionary | null>(null);
    const currentLocale = getLocaleFromPathname(pathname);

    useEffect(() => {
        const loadDictionary = async () => {
        try {
            const dict = await getDictionary(currentLocale);
            setDictionary(dict);
        } catch (error) {
            console.error("Failed to load dictionary:", error);
            // Set a fallback dictionary
            setDictionary({
            navbar: {
                brand: "MemoCast",
                profile: "Profile",
                logout: "Logout",
                language: "Language",
            },
            } as Dictionary);
        }
        };

        loadDictionary();
    }, [currentLocale]);

    if (!dictionary) {
        return (
            <header className="h-[90px] flex items-center justify-center">
                <div className="text-[#1d073a]">Loading...</div>
            </header>
        );
    }

    return <Navbar dictionary={dictionary} />;
};

export default NavbarWrapper;