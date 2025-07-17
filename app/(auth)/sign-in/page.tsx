import Image from "next/image"
import Link from "next/link"

const Page = () => {
    return (
        <main 
            className='w-full min-h-screen flex flex-col-reverse lg:flex-row
            justify-between overflow-hidden max-lg:gap-10'
        >
            <aside 
                className="bg-[#C3B1E1] lg:w-1/2 flex flex-col justify-between
                lg:h-screen w-full py-10 px-6 lg:pl-10 gap-6"
            >
                <Link
                    href="/" 
                    className="flex items-center gap-2.5"
                >
                    <Image
                        src="/assets/icons/favicon.ico"
                        alt="logo"
                        width={32}
                        height={32} 
                    />
                    <h1 
                        className="font-bold text-shadow-lg"
                    >
                        MemoCast
                    </h1>
                </Link>

                <div 
                    className="flex items-center justify-center"
                >
                    <section 
                        className="flex flex-col items-center justify-center
                        gap-8 px-6 sm:px-8 w-full max-w-2xl"
                    >
                        <figure 
                            className="flex items-center gap-1 justify-center"
                        >
                            {Array.from({ length: 5}).map((_, index) => (
                                <Image
                                    src="/assets/icons/star.svg"
                                    alt="star"
                                    width={20}
                                    height={20}
                                    key={ index } 
                                />
                            ))}
                        </figure>
                        <p 
                            className="text-3xl font-semibold text-dark-100
                            text-center -tracking-[2px]"
                        >
                            MemoCast makes screen recording easy. From quick walkthroughs to full presentiations, it is fast, smooth and shareable in seconds
                        </p>
                        
                        <article 
                            className="flex flex-col gap-2.5 items-center"
                        >
                            <Image
                                src="/assets/images/test.png"
                                alt="person"
                                width={64}
                                height={64}
                                className="w-16 h-16 object-cover"
                            />
                            <div 
                                className="flex flex-col items-center gap-1"
                            >
                                <h2 
                                    className="text-base font-bold text-dark-100"
                                >
                                    Luis Contreras
                                </h2>
                                <p 
                                    className="text-gray-100 font-normal text-sm
                                    -tracking-[0.5px]"
                                >
                                    Product Designer, NovaByte
                                    </p>
                            </div>
                        </article>
                    </section>
                </div>
                <p>
                    © MemoCast {(new Date()).getFullYear()}
                </p>
            </aside>

            <aside 
                className="flex items-center justify-center lg:w-1/2 w-full
                lg:h-screen px-10 py-10"
            >
                <section 
                    className="rounded-20 bg-white shadow-10 max-w-xl w-full
                    flex flex-col px-5 py-7.5 gap-8"
                >
                    <Link 
                        href="/" 
                        className="flex items-center gap-2.5 justify-center" 
                    >
                        <Image 
                            src="/assets/icons/favicon.ico"
                            alt="person"
                            width={40}
                            height={40} 
                        />
                        <h1 
                            className="text-28 font-black text-blue-100 font-satoshi
                            text-shadow-lg"
                        >
                            MemoCast
                        </h1>
                    </Link>
                    <p 
                        className="text-3xl font-bold text-dark-100 text-center
                        -tracking-[2px]"
                    >
                        Create and share your first
                            <span 
                                className="text-[#C3B1E1] mx-2"
                            >
                                MemoCast video
                            </span>
                        in no time!
                    </p>
                    <button 
                        className="w-full flex justify-center items-center gap-2.5
                        bg-white border border-gray-25 rounded-4xl py-4 text-base 
                        text-dark-100 font-semibold cursor-pointer -tracking-[0.8px]"
                    >
                        <Image
                            src="/assets/icons/google.svg"
                            alt="google"
                            width={22} 
                            height={22} 
                        />
                        <span>
                            Sign in with Google
                            </span>
                    </button>
                </section>
            </aside>
        </main>
    )
}

export default Page