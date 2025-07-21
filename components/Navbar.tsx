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
            className='h-[90px] border-b border-[#1d073a] flex items-center'
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
                            onClick={() => router.push('/profile/123456')}
                        >
                            <ImageWithFallback
                                src={session?.user.image ?? ""}
                                alt="user"
                                width={60}
                                height={60}
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