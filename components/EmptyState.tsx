import Image from "next/image"

const EmptyState = ({ icon, title, description} : EmptyStateProps) => {
    return (
        <section
            className="flex flex-col items-center px-4 py-10 gap-6
            rounded-2xl border border-gray-20 shadow-10 w-full"
        >
            <figure
                className="bg-[#C3B1E1] rounded-[20px] flex items-center justify-center size-20"
            >
                <Image
                    src={ icon }
                    alt="icon"
                    width={46}
                    height={46}
                />
            </figure>
            <article
                className="flex flex-col items-center gap-1.5"
            >
                <h1
                    className="text-[#1d073a] text-2xl font-bold -tracking-[1px]"
                >
                    { title}
                </h1>
                <p
                    className="text-sm font-normal text-gray-100 -tracking-[0.5px]"
                >
                    { description}
                </p>
            </article>
        </section>
    )
}

export default EmptyState