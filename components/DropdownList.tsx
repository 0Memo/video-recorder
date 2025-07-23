"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const DropdownList = () => {
    const [ isOpen, setIsOpen ] = useState(false)
    return (
        <div
            className='relative'
        >
            <div
                className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div
                    style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', borderBottom: '4px solid #C3B1E1' }}
                    className='p-4 flex flex-row items-center justify-center gap-3 border border-purple-900'
                >
                    <figure
                        className='inline-flex'
                    >
                        <Image
                            src="/assets/icons/menu.svg"
                            alt="menu"
                            width={24}
                            height={24}
                            style={{ 
                                filter: 'brightness(0) saturate(100%) invert(16%) sepia(51%) saturate(2261%)    hue-rotate(229deg) brightness(92%) contrast(101%)', marginRight: '5px'
                            }}
                        />
                        Most recent
                    </figure>

                    <Image
                        src="/assets/icons/arrow-down.svg"
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
                    className='absolute bg-white shadow-lg flex flex-col w-full z-10 top-12 border border-[#1d073a]'
                    style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                >
                    {['Most recent', 'Most liked'].map((option) =>(
                        <li
                            key={option}
                            className='px-3 py-3 text-sm font-medium -tracking-[0.8px] relative text-dark-100 cursor-pointer hover:bg-[#1d073a] hover:text-white transition-colors duration-200 ease-in-out'
                            style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
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