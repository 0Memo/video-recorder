"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { ICONS } from "../constants"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "../lib/i18n/utils";
import type { Dictionary } from "../lib/i18n/dictionaries";
import { useTheme } from "../lib/hooks/useTheme";

interface DropDownProps {
    dictionary: Dictionary;
}

const DropdownList = ({ dictionary }: DropDownProps) => {
    const [ isOpen, setIsOpen ] = useState(false)
    const pathname = usePathname();
    const currentLocale = getLocaleFromPathname(pathname);
    const { theme, mounted } = useTheme();

    if (!mounted) return null;

    return (
        <div
            className='relative'
        >
            <div
                className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div
                    className='p-4 flex flex-row items-center justify-center gap-3 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border border-[#1d073a] border-b-4 border-b-[#C3B1E1]'
                >
                    <figure
                        className={`inline-flex ${
                            theme === "dark" ? "text-white" : "text-[#1d073a]"
                        }`}
                    >
                        <Image
                            src={ ICONS.menu }
                            alt="menu"
                            width={24}
                            height={24}
                            style={{ 
                                filter: 'brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%)    hue-rotate(229deg) brightness(92%) contrast(101%)', marginRight: '5px'
                            }}
                        />
                        {dictionary.list.title}
                    </figure>

                    <Image
                        src={ ICONS.arrowDown }
                        alt="arrow down"
                        width={20}
                        height={20}
                        style={{ 
                            filter: 'brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%)    hue-rotate(229deg) brightness(92%) contrast(101%)'
                        }}
                    />
                </div>
            </div>

            {isOpen && (
                <ul
                    className={`absolute shadow-lg flex flex-col w-full z-10 top-12 border border-[#1d073a] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] ${
                            theme === "dark" ? "bg-[#1d073a]" : "bg-white"
                        }`}
                >
                    {[dictionary.list.recent, dictionary.list.like].map((option) =>(
                        <li
                            key={option}
                            className={`px-3 py-3 text-sm font-medium -tracking-[0.8px] relative text-dark-100 cursor-pointer transition-colors duration-200 ease-in-out rounded-[255px_15px_225px_15px/15px_225px_15px_255px] ${
                            theme === "dark" ? "text-white hover:bg-white hover:text-[#1d073a]" : "text-[#1d073a] hover:bg-[#1d073a] hover:text-white"
                        }`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DropdownList