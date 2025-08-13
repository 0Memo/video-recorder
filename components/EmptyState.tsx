"use client"

import Image from "next/image"
import { useTheme } from "../lib/hooks/useTheme";
import { cn } from "../lib/utils";

const EmptyState = ({ icon, title, description} : EmptyStateProps) => {
    const { theme } = useTheme();

    return (
        <section
            className={cn("flex flex-col items-center px-4 py-10 gap-6 rounded-2xl border shadow-10 w-full",
                theme === "dark"
                    ? "border-[#C3B1E1]"
                    : "border-[#1d073a]"
            )}
        >
            <figure
                className="bg-[#C3B1E1] rounded-[20px] flex items-center justify-center size-20"
            >
                <Image
                    src={ icon }
                    alt="icon"
                    width={46}
                    height={46}
                />
            </figure>
            <article
                className="flex flex-col items-center gap-1.5"
            >
                <h1
                    className={cn("text-2xl font-bold -tracking-[1px]",
                        theme === "dark"
                            ? "text-[#C3B1E1]"
                            : "text-[#1d073a]"
                    )}
                >
                    { title}
                </h1>
                <p
                    className="text-sm font-normal text-gray-100 -tracking-[0.5px]"
                >
                    { description}
                </p>
            </article>
        </section>
    )
}

export default EmptyState