import { ICONS } from "../constants"
import Image from "next/image"
import Link from "next/link"
import DropdownList from "./DropdownList"
import RecordScreen from "./RecordScreen"

const Header = ({ subHeader, title, userImg } : SharedHeaderProps) => {
    return (
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
                            src={userImg || '/assets/images/test.png'}
                            alt="User"
                            width={66}
                            height={66}
                            style={{ width: 'auto', height: 'auto' }}
                        />
                    )}

                    <article
                        className="flex flex-col gap-1 -tracking-[0.8px]"
                    >
                        <h1
                            className="text-[#1d073a] text-2xl font-bold text-shadow-lg"
                        >
                            {title}
                        </h1>
                        <p
                            className="text-sm text-gray-100 font-medium"
                        >
                            {subHeader}
                        </p>
                    </article>
                </div>

                <aside
                    className="flex items-center gap-2 md:gap-4"
                >
                    <Link
                        href="/upload"
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
                            Upload a video
                        </span>
                    </Link>
                    <RecordScreen />
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
                        placeholder="Search for videos, folders..."
                        className="focus:outline-[#C3B1E1] py-2 pl-8
                        pr-5 text-[#1d073a] text-sm font-normal w-full
                        placeholder:text-gray-100 placeholder:italic
                        placeholder:font-semibold"
                    />
                    <Image
                        src="/assets/icons/search.svg"
                        alt="search"
                        width={20}
                        height={20}
                        style={{ 
                            filter: 'brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%)    hue-rotate(229deg) brightness(92%) contrast(101%)'
                        }}
                        className="absolute top-1/2 left-3 -translate-y-1/2"
                    />
                </div>

                <DropdownList />
            </section>
        </header>
    )
}

export default Header