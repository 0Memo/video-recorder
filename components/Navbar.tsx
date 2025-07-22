"use client"
import Image from 'next/image'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import ImageWithFallback from "./ImageWithFallback";

const Navbar = () => {
    const router = useRouter()
    const { data: session } = authClient.useSession();
    const user = session?.user;
    
    return (
        <header
            className='h-[90px] flex items-center'
            style={{
                // For multiple backgrounds, combine them into a single string for backgroundImage
                backgroundImage: `
                    linear-gradient(to bottom, #1d073a 0%, #1d073a 100%),
                    linear-gradient(to bottom, #1d073a 0%, #1d073a 100%),
                    radial-gradient(circle, #1d073a 0%, #1d073a 30%, transparent 40%, transparent 100%)
                `,
                // Combine multiple background sizes into a single string
                backgroundSize: 'calc(50% - 1rem) 1px, calc(50% - 1rem) 1px, 1rem 1rem',
                // Combine multiple background positions into a single string
                backgroundPosition: '0% calc(100% - .5rem), 100% calc(100% - .5rem), 50% 100%',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <nav
                className='flex items-center justify-between max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full'
            >
                <Link
                    href="/"
                    className='flex items-center gap-2.5'
                >
                    <Image
                        src="/assets/icons/favicon.ico"
                        alt="Logo"
                        width={32}
                        height={32}
                    />
                    <h1
                        className='font-semibold mt-1 text-xl text-[#1d073a] text-shadow-lg font-satochi -tracking-[0.1px]'
                    >
                        MemoCast
                    </h1>
                </Link>
            
                {user && (
                    <figure className='flex items-center gap-2.5'>
                        <button
                            onClick={() => router.push(`/profile/${ user?.id }`)}
                        >
                            <ImageWithFallback
                                src={session?.user.image ?? ""}
                                alt="user"
                                width={20}
                                height={20}
                                className='mt-2'
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </button>
                        <button
                            className='cursor-pointer'
                            onClick={async () => {
                                return await authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
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