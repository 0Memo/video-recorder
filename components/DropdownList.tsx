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
                    style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', borderBottom: '4px solid #E9D4FF' }}
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
                    className='dropdown'
                    style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                >
                    {['Most recent', 'Most liked'].map((option) =>(
                        <li
                            key={option}
                            className='list-item'
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