import Image from "next/image"

const FileInput = ({ id, label, accept, file, previewUrl, inputRef, onChange, onReset, type }: FileInputProps) => {
    return (
        <section className="flex flex-col gap-2">
            <label
                htmlFor={ id }
                className="text-[#1d073a] text-base font-medium"
            >
                { label }
            </label>
            <input
                type="file"
                id={ id }
                accept={ accept }
                ref={ inputRef}
                hidden
                onChange={ onChange }
            />
            {!previewUrl ? (
                <figure
                    onClick={ () => inputRef.current?.click() }
                    className="border-2 border-[#1d073a] rounded-18 text-gray-100 py-1.5 px-3.5 flex justify-center items-center w-full h-40 gap-2.5 cursor-pointer"
                >
                    <Image
                        src="/assets/icons/upload.svg"
                        alt="upload"
                        width={24}
                        height={24}
                    />
                    <p
                        className="text-[#1d073a] text-base font-medium"
                    >
                        Click to upload your { id }
                    </p>
                </figure>
            ) : (
                <div
                    className="relative w-full h-64 rounded-18 overflow-hidden"
                >
                    { type === "video"
                        ? <video src={ previewUrl} controls className="w-full h-full object-contain" />
                        : <Image src={ previewUrl } alt="image" fill />
                    }
                    <button
                        type="button"
                        onClick={ onReset }
                        className="absolute top-2 right-2 bg-gray-20 text-white p-2 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] opacity-90 hover:opacity-100 cursor-pointer"
                    >
                        <Image
                            src="/assets/icons/close.svg"
                            alt="close"
                            width={16}
                            height={16}
                            className="object-contain"
                        />
                    </button>
                    <p
                        className="absolute bottom-0 left-0 right-0 bg-dark-100 text-white px-3 py-1 text-sm truncate"
                    >
                        { file?.name }
                    </p>
                </div>
            )}
        </section>
    )
}

export default FileInput