import { ICONS } from "@/constants"
import Image from "next/image"
import Link from "next/link"

/* eslint-disable @typescript-eslint/no-explicit-any */
const Header = ({ subHeader, title, userImg } : any) => {
    return (
        <header
            className="header"
        >
            <section
                className="header-container"
            >
                <div
                    className="details"
                >
                    {userImg && (
                        <Image
                            src={userImg || '/assets/images/test.png'}
                            alt="User"
                            width={66}
                            height={66} 
                        />
                    )}

                    <article>
                        <p>
                            {subHeader}
                        </p>
                        <h1
                            className="text-[#1d073a]"
                        >
                            {title}
                        </h1>
                    </article>
                </div>

                <aside>
                    <Link
                        href="/upload"
                        style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', borderBottom: '4px solid #E9D4FF' }}
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
                        <span>
                            Upload a video
                        </span>
                    </Link>
                    <div
                        className="record"
                    >
                        <button
                            className="primary-btn"
                            style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                        >
                            <Image
                                src={ ICONS.record }
                                alt="record"
                                width={24}
                                height={24}
                                style={{ filter: 'brightness(0) invert(1)' }} 
                            />
                            <span>
                                Record a video
                            </span>
                        </button>
                    </div>
                </aside>
            </section>

            <section
                className="search-filter"
            >
                <div
                    className="search"
                >
                    <input
                        type="text"
                        style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                        placeholder="Search for videos, tags, folders..."
                    />
                    <Image
                        src="/assets/icons/search.png" alt="search" width={20} height={20}
                    />
                </div>

                {/* <DropdownList /> */}
                
            </section>
        </header>
    )
}

export default Header