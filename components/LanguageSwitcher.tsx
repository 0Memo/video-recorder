"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { i18n, type Locale, localeNames, localeFlags } from "../lib/i18n/config";
import {
    addLocaleToPathname,
    removeLocaleFromPathname,
} from "../lib/i18n/utils";
import { useTheme } from "../lib/hooks/useTheme";
import LoadingOverlay from "./LoadingOverlay";

interface LanguageSwitcherProps {
    currentLocale: Locale;
}

const LanguageSwitcher = ({ currentLocale }: LanguageSwitcherProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { theme, mounted } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!mounted) return null;

    const handleLocaleChange = (newLocale: Locale) => {
        if (newLocale === currentLocale) {
            setIsOpen(false);
            return;
        }
        setIsLoading(true);
        document.body.classList.add("fading");
        setIsOpen(false);

        const pathnameWithoutLocale = removeLocaleFromPathname(pathname);
        const newPathname = addLocaleToPathname(pathnameWithoutLocale, newLocale);

        router.push(newPathname);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-[#1d073a] hover:text-white rounded-[255px_15px_225px_15px/15px_225px_15px_255px] transition-colors border-b-4 border-transparent duration-200 hover:border-b-4 hover:border-b-[#C3B1E1] ${ theme === "dark" ? "text-white" : "text-[#1d073a]" }`}
                aria-label="Select language"
            >
                <GlobeAltIcon className="w-4 h-4" />
                <span className="hidden sm:inline">
                    {localeFlags[currentLocale]} {localeNames[currentLocale]}
                </span>
                <span className="sm:hidden">
                    {localeFlags[currentLocale]}
                </span>
                <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                }`}
                />
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-48 bg-white rounded-[255px_15px_225px_15px/15px_225px_15px_255px] shadow-lg border border-gray-200 py-1 z-100">
                {i18n.locales.map((locale) => (
                    <button
                        key={locale}
                        onClick={() => handleLocaleChange(locale)}
                        className={`w-full text-left px-3 py-3 text-sm rounded-[255px_15px_225px_15px/15px_225px_15px_255px] hover:bg-[#C3B1E1] transition-colors duration-200 flex items-center gap-3 ${
                            locale === currentLocale
                            ? "bg-gray-50 text-[#1d073a] font-medium"
                            : "text-gray-700"
                        }`}
                    >
                        <span className="text-lg">
                            {localeFlags[locale]}
                        </span>
                        <span>
                            {localeNames[locale]}
                        </span>
                        {locale === currentLocale && (
                            <span className="ml-auto text-[#1d073a]">✓</span>
                        )}
                    </button>
                ))}
                </div>
            )}
            {isLoading && <LoadingOverlay color="#1d073a" />}{" "}
        </div>
    );
};

export default LanguageSwitcher;