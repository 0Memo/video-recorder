"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const user = {}

const Navbar = () => {
    const router = useRouter()
    return (
        <header
            className='navbar'
        >
            <nav
                className='wrapper flex justify-between'
            >
                <Link
                    href="/"
                    className='flex flex-row gap-4'
                >
                    <Image
                        src="/assets/icons/favicon.ico"
                        alt="Logo"
                        width={32}
                        height={32}
                    />
                    <h1
                        className='font-semibold mt-1 text-[#1d073a]'
                    >
                        MemoCast
                    </h1>
                </Link>
            
                {user && (
                    <figure>
                        <button
                            onClick={() => router.push('/profile/123456')}
                        >
                            <Image
                                src="/assets/images/test.png"
                                alt="user"
                                width={60}
                                height={60}
                                className='mt-2'
                            />
                        </button>
                        <button
                            className='cursor-pointer'
                        >
                            <Image
                                src="/assets/icons/exit.svg"
                                alt="logout"
                                width={32}
                                height={32}
                                style={{ 
                                    filter: 'brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%)    hue-rotate(229deg) brightness(92%) contrast(101%)'
                                }}
                            />
                        </button>
                    </figure>
                )}
            </nav>
        </header>
    )
}

export default Navbar