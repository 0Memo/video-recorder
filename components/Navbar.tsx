"use client";

import Image from "next/image";
import { redirect, useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ImageWithFallback from "./ImageWithFallback";
import { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { ICONS } from "../constants";
import { getLocaleFromPathname } from "../lib/i18n/utils";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = getLocaleFromPathname(pathname);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <header
                className="h-[90px] flex items-center"
                style={{
                backgroundImage:
                    "linear-gradient(to bottom, #1d073a 0%, #1d073a 100%), linear-gradient(to bottom, #1d073a 0%, #1d073a 100%), radial-gradient(circle, #1d073a 0%, #1d073a 30%, transparent 40%, transparent 100%)",
                backgroundSize:
                    "calc(50% - 1rem) 1px, calc(50% - 1rem) 1px, 1rem 1rem",
                backgroundPosition:
                    "0% calc(100% - .5rem), 100% calc(100% - .5rem), 50% 100%",
                backgroundRepeat: "no-repeat",
                }}
            >
                <nav className="flex items-center justify-between max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <button
                    onClick={() => {
                        setIsLoading(true);
                        router.push('/')
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 1000);
                    }} 
                    className="flex items-center gap-2.5"
                >
                    <Image
                        src={ ICONS.favicon }
                        alt="Logo"
                        width={32}
                        height={32}
                    />
                    <h1
                        className="font-semibold mt-1 text-xl text-[#1d073a] text-shadow-lg font-satochi -tracking-[0.1px]"
                    >
                    MemoCast
                    </h1>
                </button>
                <div className="flex items-center gap-4">
                    <LanguageSwitcher currentLocale={currentLocale} />
                    {user && (
                        <figure
                            className="flex items-center gap-2.5"
                        >
                        <button
                            onClick={() => {
                                setIsLoading(true);
                                router.push(`/profile/${user?.id}`);
                                setTimeout(() => {
                                    setIsLoading(false);
                                }, 1000);
                            }}
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
                            onClick={async () => {
                                setIsLoading(true);
                                await authClient.signOut({
                                    fetchOptions: {
                                    onSuccess: () => {
                                        setIsLoading(false);
                                        redirect("/sign-in");
                                    },
                                    },
                                });
                            }}
                        >
                            <Image
                            src="/assets/icons/exit.svg"
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