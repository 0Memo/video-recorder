"use client";

import Image from "next/image";
import { redirect, useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ImageWithFallback from "./ImageWithFallback";
import { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { ICONS } from "../constants";
import { getLocaleFromPathname, addLocaleToPathname } from "../lib/i18n/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../lib/hooks/useTheme";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = getLocaleFromPathname(pathname);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const { theme, toggleTheme, mounted } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    if (!mounted) return null;

    const baseColor = theme === "dark" ? "#ffffff" : "#1d073a";

    const handleHomeNavigation = () => {
        setIsLoading(true);
        const homeUrl = addLocaleToPathname("/", currentLocale);
        router.push(homeUrl);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleProfileNavigation = () => {
        if (!user?.id) return;
        setIsLoading(true);
        const profileUrl = addLocaleToPathname(
            `/profile/${user.id}`,
            currentLocale
        );
        router.push(profileUrl);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleSignOut = async () => {
        setIsLoading(true);
        await authClient.signOut({
            fetchOptions: {
            onSuccess: () => {
                setIsLoading(false);
                const signInUrl = addLocaleToPathname("/sign-in", currentLocale);
                redirect(signInUrl);
            },
            },
        });
    };

    return (
        <>
            <header
                className="h-[90px] flex items-center"
                style={{
                    backgroundImage: `
                    linear-gradient(to bottom, ${baseColor} 0%, ${baseColor} 100%),
                    linear-gradient(to bottom, ${baseColor} 0%, ${baseColor} 100%),
                    radial-gradient(circle, ${baseColor} 0%, ${baseColor} 30%, transparent 40%, transparent 100%)`,
                    backgroundSize: "calc(50% - 1rem) 1px, calc(50% - 1rem) 1px, 1rem 1rem",
                    backgroundPosition:
                    "0% calc(100% - .5rem), 100% calc(100% - .5rem), 50% 100%",
                    backgroundRepeat: "no-repeat",
                }}
                suppressHydrationWarning
            >
                <nav className="flex items-center justify-between max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <button
                    onClick={ handleHomeNavigation } 
                    className="flex items-center gap-2.5"
                >
                    <Image
                        src={ ICONS.favicon }
                        alt="Logo"
                        width={32}
                        height={32}
                    />
                    <h1
                        className={`font-semibold mt-1 text-xl text-shadow-lg font-satochi -tracking-[0.1px] ${
                            theme === "dark" ? "text-white" : "text-[#1d073a]"
                        }`}
                        suppressHydrationWarning
                    >
                        MemoCast
                    </h1>
                </button>
                <div className="flex items-center gap-4">
                    <LanguageSwitcher currentLocale={currentLocale} />
                    <button
                        onClick={ toggleTheme }
                        className="p-2 rounded-lg hover:bg-gray-500 dark:hover:bg-gray-200 transition-colors duration-200"
                        aria-label="Toggle Theme"
                    >
                        {theme === "light" ? (
                        <MoonIcon className="w-6 h-6 text-blue-600" />
                        ) : (
                        <SunIcon className="w-6 h-6 text-yellow-600" />
                        )}
                    </button>
                    {user && (
                        <figure
                            className="flex items-center gap-2.5"
                        >
                        <button
                            onClick={ handleProfileNavigation }
                        >
                            <ImageWithFallback
                            src={session?.user.image ?? ""}
                            alt="user"
                            width={20}
                            height={20}
                            className="mt-2"
                            style={{ width: "auto", height: "auto" }}
                            />
                        </button>
                        <button
                            className="cursor-pointer"
                            onClick={ handleSignOut }
                        >
                            <Image
                            src={ ICONS.exit }
                            alt="logout"
                            width={32}
                            height={32}
                            style={{
                                filter:
                                "brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%) hue-rotate(229deg) brightness(92%) contrast(101%)",
                            }}
                            />
                        </button>
                        </figure>
                    )}
                </div>
                </nav>
            </header>
            {isLoading && <LoadingOverlay color="#1d073a" />}{" "}
        </>
    );
};

export default Navbar;