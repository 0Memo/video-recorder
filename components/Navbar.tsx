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
import { useTheme } from "../lib/hooks/useTheme";
import { motion as m } from "framer-motion";
import type { Dictionary } from "../lib/i18n/dictionaries";
import { cn } from "../lib/utils"

interface NavbarProps {
    dictionary?: Dictionary;
}

const Navbar = ({ dictionary }: NavbarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = getLocaleFromPathname(pathname);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [isLoading, setIsLoading] = useState(false);
    const { theme, toggleTheme, mounted } = useTheme();
    const [isFading, setIsFading] = useState(false);
    if (!mounted) return null;

    const baseColor = theme === "dark" ? "#ffffff" : "#1d073a";

    const navbarBrand = dictionary?.navbar?.brand || "MemoCast";
    const profileText = dictionary?.navbar?.profile || "Profile";
    const logoutText = dictionary?.navbar?.logout || "Logout";

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
        <div
            className={`transition-opacity duration-300 ease-in-out ${
                isFading ? "opacity-0" : "opacity-100"
            }`}
        >
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
                        onClick={handleHomeNavigation}
                        className="flex items-center gap-2.5"
                    >
                        <Image
                            src={ICONS.favicon || "/placeholder.svg"}
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
                            {navbarBrand}
                        </h1>
                    </button>
                    <div className="flex items-center gap-1">
                        <LanguageSwitcher currentLocale={currentLocale} />
                        <button
                            onClick={toggleTheme}
                            className={cn("p-1 rounded-lg transition-colors duration-200 -ml-2 md:ml-0",
                                theme === "dark"
                                    ? "hover:bg-gray-500"
                                    : "hover:bg-gray-300"
                            )}
                            aria-label="Toggle Theme"
                        >
                            <div className="h-14 w-14">
                                <m.svg
                                    width="56"
                                    height="56"
                                    viewBox="0 0 95 95"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <m.g
                                        transform={
                                        theme === "dark" ? "translate(0 0)" : "translate(0 0)"
                                        }
                                    >
                                        <m.path
                                            d={
                                                theme === "dark"
                                                ? "M47.5 66C57.7173 66 66 57.7173 66 47.5C53.8529 51.5473 41.8284 47.6586 47.5 29C37.2827 29 29 37.2827 29 47.5C29 57.7173 37.2827 66 47.5 66Z"
                                                : "M47.5 66C57.7173 66 66 57.7173 66 47.5C66 37.2827 57.7173 29 47.5 29C37.2827 29 29 37.2827 29 47.5C29 57.7173 37.2827 66 47.5 66Z"
                                            }
                                            animate={{
                                                fillOpacity: 0.35,
                                                strokeOpacity: 1,
                                                fill: theme === "dark" ? "#60a5fa" : "#ca8a04",
                                                stroke: theme === "dark" ? "#60a5fa" : "#ca8a04",
                                                rotate: theme === "dark" ? 360 : 0,
                                                scale: theme === "dark" ? 1.2 : 1,
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                ease: "easeInOut",
                                            }}
                                            initial={false}
                                        />
                                    </m.g>
                                    <m.g
                                        className="stroke-2"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                        opacity: theme === "dark" ? 0 : 1,
                                        scale: theme === "dark" ? 0.8 : 1,
                                        stroke: theme === "dark" ? "#60a5fa" : "#ca8a04",
                                        }}
                                        transition={{
                                        duration: 0.8,
                                        ease: "easeInOut",
                                        }}
                                    >
                                        <path d="M47.5 1.25V10.5" />
                                        <path d="M47.5 84.5V93.75" />
                                        <path d="M14.8012 14.8012L21.3225 21.3225" />
                                        <path d="M73.6775 73.6775L80.1987 80.1987" />
                                        <path d="M1.25 47.5H10.5" />
                                        <path d="M84.5 47.5H93.75" />
                                        <path d="M21.3225 73.6775L14.8012 80.1987" />
                                        <path d="M80.1987 14.8012L73.6775 21.3225" />
                                    </m.g>
                                </m.svg>
                            </div>
                        </button>
                        {user && (
                            <figure className="flex items-center gap-2.5">
                                <button
                                    onClick={ handleProfileNavigation }
                                    className={cn("border rounded-full",
                                        theme === "dark"
                                            ? "border-white"
                                            : "border-[#1d073a]"
                                    )}
                                    title={profileText}
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
                                    onClick={handleSignOut}
                                    title={logoutText}
                                >
                                    <Image
                                        src={ ICONS.exit }
                                        alt={ logoutText }
                                        width={42}
                                        height={42}
                                        style={{
                                            filter:
                                                theme === "dark"
                                                ? "invert(100%)"
                                                : "brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%) hue-rotate(229deg) brightness(92%) contrast(101%)",
                                        }}
                                    />
                                </button>
                            </figure>
                        )}
                    </div>
                </nav>
            </header>
            {isLoading && <LoadingOverlay color="#1d073a" />}
        </div>
    );
};

export default Navbar;