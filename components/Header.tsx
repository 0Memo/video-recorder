"use client"
import { ICONS } from "../constants"
import Image from "next/image"
import DropdownList from "./DropdownList"
import RecordScreen from "./RecordScreen"
import LoadingOverlay from "./LoadingOverlay"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { Dictionary } from "../lib/i18n/dictionaries";
import { usePathname } from "next/navigation"
import { getLocaleFromPathname, addLocaleToPathname } from "../lib/i18n/utils";

interface HeaderProps extends SharedHeaderProps {
    dictionary: Dictionary;
}

const Header = ({ subHeader, title, userImg, dictionary } : HeaderProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const currentLocale = getLocaleFromPathname(pathname);

    const handleUploadNavigation = () => {
        setIsLoading(true);
        const uploadUrl = addLocaleToPathname("/upload", currentLocale);
        router.push(uploadUrl);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return (
        <>
            <header
                className="flex flex-col gap-9"
            >
                <section
                    className="flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                    <div
                        className="flex gap-2.5 items-center"
                    >
                        {userImg && (
                            <Image
                                src={userImg || '/assets/images/dummy.jpg'}
                                alt="User"
                                width={66}
                                height={66}
                                style={{ width: 'auto', height: 'auto' }}
                                className="rounded-full aspect-square"
                            />
                        )}
            
                        <article
                            className="flex flex-col gap-1 -tracking-[0.8px]"
                        >
                            <h1
                                className="text-[#1d073a] text-2xl font-bold text-shadow-lg"
                            >
                                { dictionary.video.allVideos }
                            </h1>
                            <p
                                className="text-sm text-gray-100 font-medium"
                            >
                                { dictionary.video.publicLibrary }
                            </p>
                        </article>
                    </div>
            
                    <aside
                        className="flex items-center gap-2 md:gap-4"
                    >
                        <button
                            onClick={ handleUploadNavigation }
                            style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', borderBottom: '4px solid #C3B1E1' }}
                            className="border !border-t-purple-900
                            border-r-purple-900 border-l-purple-900
                            py-2.5 px-5 flex items-center gap-2.5 text-sm
                            font-semibold"
                        >
                            <Image
                                src={ ICONS.upload }
                                alt="upload"
                                width={24}
                                height={24}
                                style={{ 
                                    filter: 'brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%)    hue-rotate(229deg) brightness(92%) contrast(101%)'
                                }}
                            />
                            <span
                                className="truncate"
                            >
                                { dictionary.upload.uploadVideo }
                            </span>
                        </button>
                        <RecordScreen dictionary={dictionary} />
                    </aside>
                </section>
            
                <section
                    className="flex flex-col md:flex-row md:items-center gap-5 justify-between"
                >
                    <div
                        className="relative max-w-[500px] w-full"
                    >
                        <input
                            type="text"
                            style={{ border: '1px solid #1d073a', borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                            placeholder={dictionary.common.search}
                            className="focus:outline-[#C3B1E1] py-2 pl-8
                            pr-5 text-[#1d073a] text-sm font-normal w-full
                            placeholder:text-gray-100 placeholder:italic
                            placeholder:font-semibold"
                        />
                        <Image
                            src={ ICONS.search }
                            alt="search"
                            width={20}
                            height={20}
                            style={{ 
                                filter: 'brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%)    hue-rotate(229deg) brightness(92%) contrast(101%)'
                            }}
                            className="absolute top-1/2 left-3 -translate-y-1/2"
                        />
                    </div>
            
                    <DropdownList dictionary={dictionary} />
                </section>
            </header>
            {isLoading && <LoadingOverlay color="#1d073a" />}{" "}
        </>
    )
}

export default Header