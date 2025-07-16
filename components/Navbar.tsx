import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const user = {}

const Navbar = () => {
    return (
        <header className='navbar'>
            <nav className='wrapper flex justify-between'>
                <Link href="/" className='flex flex-row gap-4'>
                    <Image src="/assets/icons/favicon.ico" alt="Logo" width={32} height={32}/>
                    <h1 className='font-semibold mt-1'>MemoCast</h1>
                </Link>
            
                {user && (
                    <figure>
                        <button>
                            <Image src="/assets/images/test.png" alt="user" width={64} height={64} className='mr-3 mt-2' />
                        </button>
                        <button className='cursor-pointer'>
                            <Image src="/assets/icons/exit.png" alt="logout" width={32} height={32} />
                        </button>
                    </figure>
                )}
            </nav>
        </header>
    )
}

export default Navbar